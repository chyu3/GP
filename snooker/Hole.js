function Hole(x, y, r) {
    this.pos = new p5.Vector(x, y);
    this.r = r;

    //draw hole
    this.show = function() {
        fill(0, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }
}
