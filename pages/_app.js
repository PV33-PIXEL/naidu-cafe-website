import '../styles/globals.css';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  let mx = 0, my = 0, rx = 0, ry = 0;
  let animId;

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    const moveCursor = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', moveCursor);

    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      animId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');
    const addDrink = () => document.body.classList.add('cursor-drink');
    const removeDrink = () => document.body.classList.remove('cursor-drink');

    document.querySelectorAll('a,button,[data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    document.querySelectorAll('[data-cursor="drink"]').forEach(el => {
      el.addEventListener('mouseenter', addDrink);
      el.addEventListener('mouseleave', removeDrink);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Naidu Café — Premium Shakes, Mocktails & Juices</title>
        <meta name="description" content="Naidu Café — Experience premium milkshakes, thickshakes, mocktails and fresh juices. Crafted with love in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Naidu Café" />
        <meta property="og:description" content="Premium drinks crafted with love." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#1a0f08', color: '#fdf6ec', border: '1px solid rgba(200,115,42,0.3)' }
      }} />
      <Component {...pageProps} />
    </>
  );
}
