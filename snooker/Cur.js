function Cur(set) {
    this.start = new p5.Vector();
    this.d = new p5.Vector(0, 0);
    this.set = set;

    this.move = function(whiteBall, mouseX, mouseY) {
        //set position to white ball.
        //direction set according to the positionof mouse
        this.start = whiteBall.pos.copy();
        var fnsh = new p5.Vector(mouseX, mouseY);
        this.d = fnsh.sub(this.start);

        if (this.d.mag() > max_length) {
            this.d.setMag(max_length);
        }
    }

    this.show = function() {
        //draw a line from cur and follow direction
        line(this.start.x, this.start.y, this.start.x + this.d.x, this.start.y + this.d.y);

        if (this.set) {
            line(this.start.x, this.start.y, this.start.x - this.d.x, this.start.y - this.d.y);
        }
    }

    this.strike = function(ball) {
        //convert d of cur to force then add to velocity (ball)
        var d = this.d.copy();
        d.mult(-1);
        d.div(STRIKE_FACTOR);

        if (d.mag() > max_length) {
            d.setMag(max_length);
        }

        ball.vel.add(d);
    }
}
