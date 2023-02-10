import Layout from "./Layout";
import {screen,render} from '@testing-library/react';
import user from '@testing-library/user-event';
import "@testing-library/jest-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

test('Testing Navigatoin bar logo',()=>{

    render(<Layout/>);

    const bar = screen.getByRole('link', { name: /Publicis Employee/i });
   
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('href', '#home');
});

// test('Testing whether it renders children components',()=>{
   
//     render(<Layout/>);

//     const children = <h2>Test</h2>;
    
//     expect(screen.getByText(/test/i)).toBeInTheDocument();
// });