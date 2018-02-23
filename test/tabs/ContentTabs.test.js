// Test content tabs

import React from 'react';
import ContentTabs from '../../src/tabs/ContentTabs'
import renderer from 'react-test-renderer'

test('Makes some content tabs', () => {
  const component = renderer.create(
    <Tabs className="Tabs"  >
      { this.state.location }
      <TabList>
        <Tab>Current Temperature</Tab>
      </TabList>
    </Tabs>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});