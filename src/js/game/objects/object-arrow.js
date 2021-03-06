class ArrowObject extends GameObject {
    constructor(from, to, world, attackBase) {
        super(from[0], from[1], 10, 1, VMath.atan2(from, to));
        this.world = world;
        this.from = from;
        this.to = to;
        this.maxDist = VMath.distance(from, to);
        this.attackBase = attackBase;

        this.v = VMath.normalize(VMath.sub(to, from));
    }

    update(deltaTime) {
        var d = VMath.scale(this.v, deltaTime * 20);
        this.vec[0] += d[0];
        this.vec[1] += d[1];
        var progress = Math.sin(VMath.distance(this.from, this.vec) / this.maxDist * Math.PI);
        this.adir = this.direction - Math.PI / 3 * (1 - progress);
        this.ay = this.vec[1] - progress * this.maxDist / 10;

        if (VMath.distance(this.from, this.vec) > this.maxDist) {
            this.world.removeObject(this);
        }
    }

    getY() {
        return this.ay;
    }

    getDirection() {
        return this.adir;
    }

    isHit() {
        return this.maxDist - VMath.distance(this.from, this.vec) < 10;
    }

    hit(soldier) {
        soldier.hitByArrow(this);
    }

    getAttack(soldier) {
        return this.attackBase;
    }

    getClass() {
        return "Arrow";
    };
}