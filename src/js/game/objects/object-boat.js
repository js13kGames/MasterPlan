/**
 * @constructor
 */
function BoatObject(x, y, direction) {
    GameObject.call(this, x, y, 32, 32, direction);
    
    this.vx = 0;
    this.vy = 0;
    
    this.velocity = 0;
    this.targetVelocity = 10;
    
    this.force = [0, 0];
    
    this.targetDirection = direction;
    this.turnDirection = 0;
    
    this.waypointsChecked = [];
}

BoatObject.prototype = Object.create(GameObject.prototype);

// checkpoints 
BoatObject.prototype.checkWaypoint = function (waypoint) {
    if (!this.hasChecked(waypoint)) {
        this.waypointsChecked.push(waypoint);
    }
};

BoatObject.prototype.hasChecked = function (waypoint) {
    return this.waypointsChecked.indexOf(waypoint) > -1;
};

BoatObject.prototype.getWaypoints = function() {
    return this.waypointsChecked;
};

// controls
BoatObject.prototype.turnLeft = function() {
    this.turnDirection = -1;
};

BoatObject.prototype.turnRight = function() {
    this.turnDirection = 1;
};

BoatObject.prototype.straight = function() {
    this.turnDirection = 0;
};

// update
BoatObject.prototype.updateVelocity = function(deltaTime) {
    this.velocity = this.targetVelocity * deltaTime + this.velocity * (1 - deltaTime);
};

BoatObject.prototype.getVelocity = function() {
    return this.velocity;
};

BoatObject.prototype.update = function(deltaTime) {
    this.updateVelocity(deltaTime);
    
    this.vx = Math.cos(this.getDirection()) * this.getVelocity();
    this.vy = Math.sin(this.getDirection()) * this.getVelocity();
    
    this.setX(this.x + this.vx * deltaTime + this.force[0] * deltaTime);
    this.setY(this.y + this.vy * deltaTime + this.force[1] * deltaTime);
    
    // turn
    this.targetDirection += deltaTime * this.turnDirection / 10;
    
    // rotate object
    var cx = Math.cos(this.getDirection()) * (1 - deltaTime),
        cy = Math.sin(this.getDirection()) * (1 - deltaTime);
    var dx = Math.cos(this.targetDirection) * deltaTime,
        dy = Math.sin(this.targetDirection) * deltaTime;
    this.setDirection(Math.atan2(cy + dy, cx + dx));
    
    // degrade force
    this.force = VMath.scale(this.force, 0.99 * deltaTime);
    if (VMath.length(this.force) < VMath.EPSILON) {
        this.force = [0, 0];
    }
};

BoatObject.prototype.addForce = function(vec) {
    this.force = VMath.add(this.force, vec);
}