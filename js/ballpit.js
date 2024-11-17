const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;
const section = document.querySelector('.section3');
const canvas = document.getElementById('ballPitCanvas');
const engine = Engine.create();
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: section.clientWidth,
        height: section.clientHeight,
        wireframes: false,
        background: '#f6a5c0'
    }
});

Render.run(render);
Engine.run(engine);

const boundaries = [
    Bodies.rectangle(section.clientWidth / 2, -10, section.clientWidth, 20, { isStatic: true }),
    Bodies.rectangle(section.clientWidth / 2, section.clientHeight + 10, section.clientWidth, 20, { isStatic: true }),
    Bodies.rectangle(-10, section.clientHeight / 2, 20, section.clientHeight, { isStatic: true }),
    Bodies.rectangle(section.clientWidth + 10, section.clientHeight / 2, 20, section.clientHeight, { isStatic: true })
];

World.add(engine.world, boundaries);

function randomShapes(numShapes) {
    const shapes = [];
    for (let i = 0; i < numShapes; i++) {
        const size = Math.floor(Math.random() * 30) + 20;
        const x = Math.random() * section.clientWidth;
        const y = Math.random() * section.clientHeight;
        const shapeType = Math.random();

        let shape;
        if (shapeType < 0.33) {
            // circles
            shape = Bodies.circle(x, y, size / 2, { restitution: 0.9, friction: 0.01 });
        } else if (shapeType < 0.66) {
            // squares
            shape = Bodies.rectangle(x, y, size, size, { restitution: 0.9, friction: 0.01 });
        } else {
            // this is the traingles
            const vertices = [
                { x: 0, y: 0 },
                { x: size, y: 0 },
                { x: size / 2, y: size }
            ];
            shape = Bodies.fromVertices(x, y, vertices, { restitution: 0.9, friction: 0.01 });
        }

        shapes.push(shape);
    }
    return shapes;
}

const shapes = randomShapes(900);
World.add(engine.world, shapes);

const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(engine.world, mouseConstraint);


window.addEventListener('resize', () => {
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: section.clientWidth, y: section.clientHeight }
    });
});
