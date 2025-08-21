/**
 * @jest-environment jsdom
 */
import Modal from '@/app/component/modal';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
jest.useFakeTimers()
describe('Modal Component',()=>{
    it('Renders Modal',()=>{
        render(<Modal messages='Hello' show={true}/>)
        expect(screen.getByText('Hello')).toBeInTheDocument
    })
    it('Modal Dissapear',()=>{
        render(<Modal messages='Hello' show={true}/>)
        expect(screen.getByText("Hello")).toBeInTheDocument();
        act(() => {
      jest.advanceTimersByTime(5000);
    });
        expect(screen.getByText('Hello')).not.toBeInTheDocument
    })
})