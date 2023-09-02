const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
};

let img;
let r, g, b, a, color, ix, iy;
const sketch = () => {
  
  const imgCanvas  = document.createElement('canvas');
  const imgContext = imgCanvas.getContext('2d')
  
  imgCanvas.width  = img.width;
  imgCanvas.height = img.height;
  
  imgContext.drawImage(img, 0, 0)
  const imgData = imgContext.getImageData(0, 0, imgCanvas.width, imgCanvas.height).data;
  
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    
    // context.drawImage(imgCanvas, 0, 0);

    
    const cols = 100;
    const rows = 100;
    const numCells = cols * rows;
    
    const gridw = width  * 0.9;
    const gridh = height * 0.9;
    const cellw = gridw / rows;
    const cellh = gridh / cols;
    const margx = (width - gridw) * 0.5
    const margy = (height - gridh) * 0.5
    
    for(let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor( i / cols -4 );
      
      const x = col * cellw;
      const y = row * cellh;
      
        // const w = cellw * 0.8;
        // const h = cellh * 0.8;
        
        ix = Math.floor((x / width)  * img.width);
        iy = Math.floor((y / height) * img.height);
        
        idx = (iy * img.width + ix) *4
        
        r = imgData[idx + 0]
        g = imgData[idx + 1+20]
        b = imgData[idx + 2]
        a = imgData[idx + 3]
        color = `rgba(${r}, ${g}, ${b}, 1)`
        
        context.save();
        context.translate(x, y);
        context.translate(margx, margy);
        // context.translate(cellw * 0.5, cellh * 0.5);
        let m = random.range(0, 50)
        
        
        
        context.beginPath();
        // context.rect(0, 0, cellw, cellh);
        context.arc(0, 0, 5, 0, Math.PI * 2);
        context.rect(0,0, 0, 100)
        context.fillStyle = color ;
        context.fill();
        
        context.restore();
        
      };
    }
  };
  
  const loadImage = async(url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();  
      img.onload = () => resolve(img);
      img.onerror= () => reject();
    img.src = url;
  })
}

const start = async () => {
  img = await loadImage('image/image.png')
  
  canvasSketch(sketch, settings);

};

start();

