import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Password from './Password';
import '@testing-library/jest-dom';

describe('Password Component', () => {
  test('renders all input fields and button', () => {
    render(<Password />);

    expect(screen.getByText(/Password Generator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password Length/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Alphabets/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Numbers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Symbols/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Password/i })).toBeInTheDocument();
  });

  test('shows error for invalid password length', () => {
    render(<Password />);

    const input = screen.getByLabelText(/Password Length/i);
    const button = screen.getByRole('button', { name: /Generate Password/i });

    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.click(button);

    expect(screen.getByText(/Please Enter a Valid Length/i)).toBeInTheDocument();
  });

  test('shows error when no character sets are selected', () => {
    render(<Password />);

    const lengthInput = screen.getByLabelText(/Password Length/i);
    fireEvent.change(lengthInput, { target: { value: '8' } });


    const alphabetsCheckbox = screen.getByLabelText(/Include Alphabets/i);
    const numbersCheckbox = screen.getByLabelText(/Include Numbers/i);
    const symbolsCheckbox = screen.getByLabelText(/Include Symbols/i);


    if (alphabetsCheckbox.checked) fireEvent.click(alphabetsCheckbox);
    if (numbersCheckbox.checked) fireEvent.click(numbersCheckbox);
    if (symbolsCheckbox.checked) fireEvent.click(symbolsCheckbox);

    fireEvent.click(screen.getByRole('button', { name: /Generate Password/i }));

    expect(screen.getByText(/Please select at least one character set/i)).toBeInTheDocument();
  });

  test('generates password with only alphabets', () => {
    render(<Password />);

    fireEvent.change(screen.getByLabelText(/Password Length/i), { target: { value: '12' } });

    const alphabets = screen.getByLabelText(/Include Alphabets/i);
    const numbers = screen.getByLabelText(/Include Numbers/i);
    const symbols = screen.getByLabelText(/Include Symbols/i);


    if (!alphabets.checked) fireEvent.click(alphabets);
    if (numbers.checked) fireEvent.click(numbers);
    if (symbols.checked) fireEvent.click(symbols);

    fireEvent.click(screen.getByRole('button', { name: /Generate Password/i }));

    const passwordOutput = screen.getByTestId('password-output');
    expect(passwordOutput).toBeInTheDocument();
    expect(passwordOutput.textContent.length).toBe(12);
    expect(passwordOutput.textContent).toMatch(/^[a-zA-Z]+$/);
  });

  test('generates password with numbers and symbols included', () => {
    render(<Password />);

    fireEvent.change(screen.getByLabelText(/Password Length/i), { target: { value: '15' } });

    const numbersCheckbox = screen.getByLabelText(/Include Numbers/i);
    const symbolsCheckbox = screen.getByLabelText(/Include Symbols/i);

    // Make sure numbers and symbols are checked
    if (!numbersCheckbox.checked) fireEvent.click(numbersCheckbox);
    if (!symbolsCheckbox.checked) fireEvent.click(symbolsCheckbox);

    fireEvent.click(screen.getByRole('button', { name: /Generate Password/i }));

    const passwordOutput = screen.getByTestId('password-output');
    expect(passwordOutput).toBeInTheDocument();
    expect(passwordOutput.textContent.length).toBe(15);
  });
});

