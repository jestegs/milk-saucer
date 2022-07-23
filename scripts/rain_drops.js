var canvas
var ctx

var interval_create = null;

const images = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
];
images[0].src = "../images/sprites/paint_splodges/paint_splodge1.png";
images[1].src = "../images/sprites/paint_splodges/paint_splodge2.png";
images[2].src = "../images/sprites/paint_splodges/paint_splodge3.png";
images[3].src = "../images/sprites/paint_splodges/paint_splodge4.png";
images[4].src = "../images/sprites/paint_splodges/paint_splodge5.png";

const drops = [];

class RainDrop {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        
        this.originY = y;
        this.isDisabled = false;
    }

    update() {
        ctx.globalAlpha = Math.abs(1-((this.y - this.originY) / 40));
        ctx.drawImage(this.image, this.x, this.y);
        if (this.y - this.originY > 40) {
            this.isDisabled = true;
        }
        else {
            this.y += 1;
        }
    }
}

window.onload = function() {
    canvas = document.getElementById("waterCanvas");
    ctx = canvas.getContext("2d");
    interval_create = setInterval(create_drop, 50);
}

function create_drop() {
    var cluster_pos_x = Math.floor(Math.random() * 640);
    var cluster_pos_y = Math.floor(Math.random() * 480);
    var img_idx = Math.floor(Math.random() * 5);
    
    //ctx.drawImage(images[img_idx], 10, 10);

    var drop = new RainDrop(cluster_pos_x, cluster_pos_y, images[img_idx]);
    drops.push(drop);

    ctx.clearRect(0, 0, 640, 480);

    for (var drop of drops) {
        if (!drop.isDisabled) {
            drop.update();
        }
        else {
            var idx = drops.indexOf(drop);
            drops.splice(idx, 1);
        }
    }
}