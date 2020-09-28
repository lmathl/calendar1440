import React from 'react';
import Label from 'react-bootstrap/lib/Label';

const HotkeysTab = () => (
    <div>
      <h5 className="title">Hotkeys</h5>
      <ul>
        <li><Label>Ctrl</Label> + <Label>Enter</Label> to edit today's cell</li>
        <li><Label>&lt;</Label> to previous month</li>
        <li><Label>&gt;</Label> to next month</li>
        <li>Click a day, hold <Label>shift</Label> and click another day to multiselect days</li>
        <li><Label>Ctrl</Label> + <Label>A</Label> to select all</li>
      </ul>
    </div>
);

export default HotkeysTab;