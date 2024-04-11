function Pin(x, y, id, color) {
    this.pos = new p5.Vector(x, y);
    this.vel = new p5.Vector(0, 0);
    //diameter = width/36
    this.r = width/72;
    this.id = id;
    this.color = color;
    this.collided=false;
    this.potted=false;

    this.move = function() {
        //Add friction
        var coefficientOfFriction = 0.99;
        this.vel.mult(coefficientOfFriction);

        //Move pin
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        //Check limits
        if (this.pos.x - this.r < 0 || this.pos.x + this.r > W - this.r) {
            this.vel.x *= - coefficientOfFriction;
        }
        if (this.pos.y - this.r < 0 || this.pos.y + this.r > L - this.r) {
            this.vel.y *= - coefficientOfFriction;
        }
    }

    this.isColliding = function(otherpin) {
        //distance between center of two pins
        var dx = otherpin.pos.x - this.pos.x;
        var dy = otherpin.pos.y - this.pos.y;
        var distance = sqrt(dx * dx + dy * dy);

        //detect pin touch
        var minDist = otherpin.r + this.r;
        if (distance < minDist) {
            this.collided = true;
            otherpin.collided = true;
            return true;
        }
        return false;
    }

    this.collideWithOtherPin = function(otherpin) {
        // collision algorithm inspiration : https://stackoverflow.com/questions/345838/pin-to-pin-collision-detection-and-handling
        var delta = this.pos.copy();
        delta.sub(otherpin.pos);

        var d = delta.mag();
        if (d == 0) {
            d = 1;
        }

        var minimumTranslationDistance = delta;
        minimumTranslationDistance.mult(( this.r + otherpin.r )/d);


        var im1 = 1;
        var im2 = 1;

        this.pos = this.pos.add(minimumTranslationDistance.copy().mult(im1 / (im1 + im2)));
        otherpin.pos = otherpin.pos.sub(minimumTranslationDistance.copy().mult(im2 / (im1 + im2)))

        // away from border
        if (this.pos.x < this.r) {
            this.pos.x = this.r;
        } else if (this.pos.x > W - this.r) {
            this.pos.x = W - this.r;
        }
        if (this.pos.y < this.r) {
            this.pos.y = this.r;
        } else if (this.pos.y > L - this.r) {
            this.pos.y = W - this.r;
        }
        if (otherpin.pos.x < otherpin.r) {
            otherpin.pos.x = otherpin.r;
        } else if (otherpin.pos.x > W - otherpin.r) {
            otherpin.pos.x = W - otherpin.r;
        }
        if (otherpin.pos.y < otherpin.r) {
            otherpin.pos.y = otherpin.r;
        } else if (otherpin.pos.y > L - otherpin.r) {
            otherpin.pos.y = W - otherpin.r;
        }

        // speed change
        var v = this.vel.copy().sub(otherpin.vel);
        var vn = v.dot(minimumTranslationDistance.copy().normalize());

        if (vn > 0) {
            return;
        }
        var coefficientOfRestitution = 0.5;
        var i =  (-(1 + coefficientOfRestitution) * vn) / (im1 + im2);

        var impulse = minimumTranslationDistance.copy().normalize().mult(i);

        // change in momentum
        this.vel = this.vel.add(impulse.copy().mult(im1));
        otherpin.vel = otherpin.vel.sub(impulse.copy().mult(im2));
    }

    this.show = function() {
        if (this.potted) {
            return;
        }
        if (this.collided) {
            //change colour when collided
            fill(255, 0, 255);
        } else {
            if (this.color.stripped) {
                fill(this.color.color[0], this.color.color[1], this.color.color[2], 100);
            } else {
                fill(this.color.color[0], this.color.color[1], this.color.color[2]);
            }
        }
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    this.isPotted = function(pockets) {
        for (pocket of pockets) {
            // A pin is in the pocket if 75% of its radius is in the pocket radius
            if (pocket.pos.dist(this.pos) < pocket.r + this.r * 0.75) {
                this.potted = true;
                return true;
            }
        }
        return false;
    }
}
