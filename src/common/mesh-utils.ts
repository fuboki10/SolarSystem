import Mesh from './mesh';
import * as OBJ from 'webgl-obj-loader';

// This file contain some helper classes to create simple meshes

const BLACK = [0, 0, 0, 255];
const RED = [255, 0, 0, 255];
const GREEN = [0, 255, 0, 255];
const BLUE = [0, 0, 255, 255];
const YELLOW = [255, 255, 0, 255];
const MAGENTA = [255, 0, 255, 255];
const CYAN = [0, 255, 255, 255];
const WHITE = [255, 255, 255, 255];

function createMesh(gl: WebGL2RenderingContext): Mesh {
    return new Mesh(gl, [
        { attributeLocation: 0, buffer: "positions", size: 3, type: gl.FLOAT, normalized: false, stride: 0, offset: 0 },
        { attributeLocation: 1, buffer: "colors", size: 4, type: gl.UNSIGNED_BYTE, normalized: true, stride: 0, offset: 0 }
    ]);
}

export function ColoredPlane(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5,  0.5, 0.0,
        -0.5,  0.5, 0.0,
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        255,   0,   0, 255,
          0, 255,   0, 255,
          0,   0, 255, 255,
        255,   0, 255, 255,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        0, 1, 2,
        2, 3, 0
    ]), gl.STATIC_DRAW);
    return mesh
}

export function ColoredCube(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        //Upper Face
        -1,  1, -1,
        -1,  1,  1,
         1,  1,  1,
         1,  1, -1,
        //Lower Face
        -1, -1, -1,
         1, -1, -1,
         1, -1,  1,
        -1, -1,  1,
        //Right Face
         1, -1, -1,
         1,  1, -1,
         1,  1,  1,
         1, -1,  1,
        //Left Face
        -1, -1, -1,
        -1, -1,  1,
        -1,  1,  1,
        -1,  1, -1,
        //Front Face
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1,
        -1,  1,  1,
        //Back Face
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1, -1, -1
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        //Upper Face
        ...RED, ...RED, ...RED, ...RED,
        //Lower Face
        ...GREEN, ...GREEN, ...GREEN, ...GREEN,
        //Right Face
        ...BLUE, ...BLUE, ...BLUE, ...BLUE,
        //Left Face
        ...YELLOW, ...YELLOW, ...YELLOW, ...YELLOW,
        //Front Face
        ...MAGENTA, ...MAGENTA, ...MAGENTA, ...MAGENTA,
        //Back Face
        ...CYAN, ...CYAN, ...CYAN, ...CYAN,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        //Upper Face
        0, 1, 2, 2, 3, 0,
        //Lower Face
        4, 5, 6, 6, 7, 4,
        //Right Face
        8, 9, 10, 10, 11, 8,
        //Left Face
        12, 13, 14, 14, 15, 12,
        //Front Face
        16, 17, 18, 18, 19, 16,
        //Back Face
        20, 21, 22, 22, 23, 20, 
    ]), gl.STATIC_DRAW);
    return mesh;
}

export function WhiteCube(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        //Upper Face
        -1,  1, -1,
        -1,  1,  1,
         1,  1,  1,
         1,  1, -1,
        //Lower Face
        -1, -1, -1,
         1, -1, -1,
         1, -1,  1,
        -1, -1,  1,
        //Right Face
         1, -1, -1,
         1,  1, -1,
         1,  1,  1,
         1, -1,  1,
        //Left Face
        -1, -1, -1,
        -1, -1,  1,
        -1,  1,  1,
        -1,  1, -1,
        //Front Face
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1,
        -1,  1,  1,
        //Back Face
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1, -1, -1
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        //Upper Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Lower Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Right Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Left Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Front Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Back Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        //Upper Face
        0, 1, 2, 2, 3, 0,
        //Lower Face
        4, 5, 6, 6, 7, 4,
        //Right Face
        8, 9, 10, 10, 11, 8,
        //Left Face
        12, 13, 14, 14, 15, 12,
        //Front Face
        16, 17, 18, 18, 19, 16,
        //Back Face
        20, 21, 22, 22, 23, 20, 
    ]), gl.STATIC_DRAW);
    return mesh;
}

export function LoadOBJMesh(gl: WebGL2RenderingContext, data: string){
    let obj = new OBJ.Mesh(data);
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array(obj.vertices), gl.STATIC_DRAW);
    let colors = new Uint8Array(obj.vertices.length * 4 / 3);
    colors.fill(255);
    mesh.setBufferData("colors", colors, gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array(obj.indices), gl.STATIC_DRAW);
    return mesh;
}

export function ColoredSphere(gl: WebGL2RenderingContext, verticalResolution: number=32, horizontalResolution: number=32): Mesh{
    // TODO: Create a colored sphere mesh and return it
    let mesh = createMesh(gl);
    let Radius = 1;
    let Vertices = [];
    let indices = [];
    let colors = [];
    for (let i = 0; i <= horizontalResolution; i++)
    {
        let PHI = i * Math.PI / horizontalResolution;
        let SinPhi = Math.sin(PHI);
        let CosPhi = Math.cos(PHI);

        for (let j = 0; j <= verticalResolution; j++)
        {
            let THETA = j * 2 * Math.PI / verticalResolution;
            let SinTheta = Math.sin(THETA);
            let CosTheta = Math.cos(THETA);

            let Xcord = Radius * CosTheta * SinPhi;
            let Ycord = Radius * CosPhi;
            let Zcord = Radius * SinPhi * SinTheta;

            Vertices.push(Xcord);
            Vertices.push(Ycord);
            Vertices.push(Zcord);
        }
    }

    for (let i = 0; i < horizontalResolution; i++)
    {
        for (let j = 0; j < verticalResolution; j++)
        {
            let p1 = i * (verticalResolution + 1) + j;
            let p2 = p1 + verticalResolution + 1;

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);

            indices.push(p2);
            indices.push(p2 + 1);
            indices.push(p1 + 1);
        }
    }
/*
    for (let i = 0; i < Vertices.length; i++)
    {
        colors.push(...RED);
    }
*/
    mesh.setBufferData('positions', new Float32Array(Vertices), gl.STATIC_DRAW);
  //  mesh.setBufferData('colors', new Uint8Array(colors), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint16Array(indices), gl.STATIC_DRAW);

    return mesh;
}