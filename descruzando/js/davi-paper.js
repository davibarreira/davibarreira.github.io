  <script type="text/paperscript" canvas="daviCanvas">
    var point1 = new Point(50, 50);
    var point2 = new Point(100, 50);
    var point3 = point2 - new Point (10,10);
    var point4 = point2 - new Point (10,-10);
    var zero   = point2 - point2;
    var vector = point2 - point1;
    
    var arrow  = new Symbol(path);
    var children = project.activeLayer.children;
    var path = []


    numberArrows = 10;
    for (var i = 0; i < numberArrows; i++ ){
        path[i] = new Path(point1,point2,point3,point2,point4);
        path[i].strokeColor = 'black';
        path[i].scale(0.50);
        path[i].position = Point.random()*view.size;
        path[i].angle    = 0; // Add angle property
    }
    
    var vector = new Point({
        angle: 45,
        length: 10
    });
    //console.log(children[10].angle);
    var mouseVector = vector.clone();

    var myCircle = new Path.Circle(view.center, 50);
    myCircle.strokeColor = 'black';
    myCircle.fillColor   = 'white';
    
    var path1 = children[0];

    console.log(path1.position);
    
    function showIntersections(path1, path2) {
    var intersections = path1.getIntersections(path2);
    for (var i = 0; i < intersections.length; i++) {
        new Path.Circle({
            center: intersections[i].point,
            radius: 5,
            fillColor: '#009dec'
        });
    }
}
    
    function onMouseMove(event) {
        mouseVector = -view.center + event.point;
        vector = mouseVector/30;
    }
    var rotationRate;

    function onFrame(event){
        for (var i =-0;i<numberArrows;i++){
            children[i].position.x += vector.x;
            children[i].position.y += vector.y;
            keepInView(children[i]);
            //showIntersections(children[0], )
            rotationRate = (vector.angle - children[i].angle)/3;
            //console.log(rotationRate);
            if (vector.angle > 90 && children[i].angle <-90){
                rotationRate = -(360 - vector.angle + children[i].angle)/10;
                children[i].angle+=360 + rotationRate;
            }
            if (vector.angle < -90 && children[i].angle >90){
                rotationRate = (360 + vector.angle - children[i].angle)/10;
                children[i].angle+=-360 + rotationRate;
            }
            if (vector.angle !== children[i].angle){
                children[i].rotate(rotationRate);
                children[i].angle+=rotationRate;
            }
            var dist = children[i].position-view.center;
            if (dist.length<50){
                children[i].position.x += -vector.x;
                children[i].position.y += -vector.y;
                
            }

            
        }
    }
    function keepInView(item) {
        var position = item.position;
        var itemBounds = item.bounds;
        var bounds = view.bounds;
 
        //showIntersections(path2,path3);
        if (itemBounds.left > bounds.width) {
            position.x = -item.bounds.width;
        }

        if (position.x < -itemBounds.width) {
            position.x = bounds.width;
        }

        if (itemBounds.top > view.size.height) {
            position.y = -itemBounds.height;
        }

        if (position.y < -itemBounds.height) {
            position.y = bounds.height  + itemBounds.height / 2;
        }
    }
  </script>
