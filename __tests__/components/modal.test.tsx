/**
 * @jest-environment jsdom
 */
import Modal from '@/app/component/modal';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('Modal Component',()=>{
    it('Renders Modal',()=>{
        render(<Modal messages='Hello' show={true}/>)
        expect(screen.getByText('Hello')).toBeInTheDocument
    })
})