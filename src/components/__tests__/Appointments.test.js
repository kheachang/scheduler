import React from 'react';

import { render } from '@testing-library/react';

import Appointment from '../Appointments/index';

describe('Appointment_Component', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
