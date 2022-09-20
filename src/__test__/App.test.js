import {render, screen, fireEvent} from '@testing-library/react';
import App from "../App";
import AddCar from "../components/AddCar";
import React from'react';
import TestRenderer from 'react-test-renderer';


test('open add car modal form', async() => {
    render(<App/>);
    fireEvent.click(screen.getByText('Add A Car'));
    expect(screen.getByRole('dialog')).toHaveTextContent('Add A Car');
});

test('renders a snapshot', () => {
    const tree = TestRenderer.create
    (<AddCar/>).toJSON();
    expect(tree).toMatchSnapshot();
});

