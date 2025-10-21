import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import { useWebSocket } from '../hooks/useWebSocket';

const Whiteboard = ({ color, brushSize, tool }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);
  const { sendDrawing, drawingData } = useWebSocket();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = $(canvas).parent();
      canvas.width = container.width();
      canvas.height = container.height();
      redrawCanvas();
    };

    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawingData.forEach(draw => {
        if (draw.tool === 'eraser') {
          ctx.strokeStyle = '#FFFFFF';
        } else {
          ctx.strokeStyle = draw.color;
        }
        ctx.lineWidth = draw.brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(draw.x1, draw.y1);
        ctx.lineTo(draw.x2, draw.y2);
        ctx.stroke();
      });
    };

    resizeCanvas();
    $(window).on('resize', resizeCanvas);

    return () => {
      $(window).off('resize', resizeCanvas);
    };
  }, [drawingData]);

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const coords = getCanvasCoordinates(e);
    setLastPosition(coords);

    // Draw initial point
    const drawData = {
      x1: coords.x,
      y1: coords.y,
      x2: coords.x,
      y2: coords.y,
      color: tool === 'eraser' ? '#FFFFFF' : color,
      brushSize: tool === 'eraser' ? brushSize * 2 : brushSize,
      tool
    };
    
    sendDrawing(drawData);
  };

  const draw = (e) => {
    if (!isDrawing || !lastPosition) return;
    
    const coords = getCanvasCoordinates(e);

    const drawData = {
      x1: lastPosition.x,
      y1: lastPosition.y,
      x2: coords.x,
      y2: coords.y,
      color: tool === 'eraser' ? '#FFFFFF' : color,
      brushSize: tool === 'eraser' ? brushSize * 2 : brushSize,
      tool
    };

    sendDrawing(drawData);
    setLastPosition(coords);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    startDrawing(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    draw(e.touches[0]);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  return (
    <div className="whiteboard-container">
      <canvas
        ref={canvasRef}
        className="whiteboard"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: tool === 'eraser' ? 'crosshair' : 'crosshair',
          touchAction: 'none'
        }}
      />
    </div>
  );
};

export default Whiteboard;