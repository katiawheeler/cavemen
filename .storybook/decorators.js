import React from 'react';

export const globalSetup = storyFn => (
    <div style={{ margin: '0 auto', maxWidth: '500px' }}>
        {storyFn()}
    </div>
)
