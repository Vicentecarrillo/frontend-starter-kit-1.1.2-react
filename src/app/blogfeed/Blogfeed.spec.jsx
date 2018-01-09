/**
 * @overview Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.8/introduction}
 */

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import Blogfeed from './blogfeed';
import Blogheader from '../blogheader';


describe('Blogfeed', function() {
  let wrapper;
  let ajaxResponse =
    [
      {
        "id": 1,
        "title": "Blog post #1",
        "author": "Melissa Manges",
        "publish_date": "2016-02-23",
        "slug": "blog-post-1",
        "description": "Utroque denique invenire et has.",
        "content": "<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>"
      },
      {
        "id": 2,
        "title": "Blog post #2",
        "author": "Olene Ogan",
        "publish_date": "2016-03-16",
        "slug": "blog-post-2",
        "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
        "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p> <p>Dico omnesque epicurei te vix. Tota verterem temporibus eu quo, eu iudicabit repudiandae sea. Elitr nihil gloriatur vis in.</p>"
      }
    ]

  beforeEach(function() {
    wrapper = mount(<Blogfeed />);
  });

  it('should have the blogfeed class', function() {
    expect(wrapper.find('.blogfeed').length).toBe(1);
  });

  it('should populate the feed with blog headers', function() {
    wrapper.instance().setState({ posts: ajaxResponse })
    wrapper.update();
    expect(wrapper.find('Blogheader').length).toBe(2);
  });
});
