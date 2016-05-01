    var point1 = new Point(50, 50);
    var point2 = new Point(100, 50);
    var point3 = point2 - new Point (10,10);
    var point4 = point2 - new Point (10,-10);
    var zero   = point2 - point2;
    var vector = point2 - point1;
    var path = new Path(point1,point2,point3,point2,point4);
    path.strokeColor = 'black';
    var arrow  = new Symbol(path);
    var children = project.activeLayer.children;

    path.remove();

    numberArrows = 120;
    for (var i = 0; i < numberArrows; i++ ){
        var instance = new PlacedSymbol(arrow);
        instance.scale(0.50);
        instance.position = Point.random()*view.size;
    }
    
    var vector = new Point({
        angle: 45,
        length: 0
    });

    var mouseVector = vector.clone();

    function onMouseDrag(event) {
        mouseVector = view.center - event.point;
    }

    function onFrame(event){
        for (i in children){
            children[i].position.x += 2.5;
            children[i].position.y += 1.5;
            if (children[i].bounds.left > view.size.width){
              children[i].position.x = - children[0].bounds.width;
                
            }
            if (children[i].bounds.top > view.size.height){
              children[i].position.y = - children[0].bounds.height;
          }

        }
    }
