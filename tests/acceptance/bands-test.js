import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL } from '@ember/test-helpers';
import { createBand } from 'rarwe/tests/helpers/custom-helpers';

import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Bands', function (hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  //Test 1
  test('List bands', async function (assert) {
    /* create two bands, passing an object with the
        properties to create the object */
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });

    await visit('/');

    assert.dom('[data-test-rr=band-link]').exists({ count: 2 },
      'All band links are rendered');
    assert.dom('[data-test-rr=band-list-item]:first-child').
      hasText("Radiohead", 'The first band link contains the band name');
    assert.dom('[data-test-rr=band-list-item]:last-child').
      hasText("Long Distance Calling", 'The other band link contains the band name');
  });
  //Test2
  test('Create a band', async function (assert) {

    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');

    await createBand('Caspian');

    assert.dom('[data-test-rr=band-list-item]').exists({ count: 2 },
      'A new band link is rendered');
    assert.dom('[data-test-rr=band-list-item]:last-child').
      hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-rr=songs-nav-item] > .active').
      hasText('Songs', 'The Songs tab is active');
  });

  //Test3: Test if bands are in the right order
  test('Sort songs in various ways', async function (assert) {
    let band = this.server.create('band', {
      name: 'Them Crooked Vultures' });
      this.server.create('song', {
        title: 'Elephants', rating: 5, band
      });
      this.server.create('song', { title: 'New Fang', rating: 4, band });
      this.server.create('song', {
        title: 'Mind Eraser, No Chaser',
        rating: 4, band
      });
      this.server.create('song', {
        title: 'Spinning in Daffodils',
        rating: 5, band
      });
      await visit('/');
      await click('[data-test-rr=band-link]');
      assert.equal(currentURL(), '/bands/1/songs');
      // assert.dom('[data-test-rr=song-list-item]:first-child').
      //   hasText('Elephants', 'The first song is the highest ranked, first one in the alphabet');
      // assert.dom('[data-test-rr=song-list-item]:last-child').
      //       hasText('New Fang', 'The last song is the lowest ranked, last one in the alphabet');

    //Test for multiple buttons
    await click('[data-test-rr=sort-by-title-desc]');
    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');

    await click('[data-test-rr=sort-by-title-asc]');

    assert.equal(currentURL(), '/bands/1/songs?sort=titleAsc');

    await click('[data-test-rr=sort-by-rating-asc]');

    assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');

    assert.dom('[data-test-rr=song-list-item]:first-child').
      hasText('Spinning In Daffodils',
      'The first song is the one that comes last in the alphabet');

    // assert.dom('[data-test-rr=song-list-item]:first-child').
    // hasText('Spinning In Daffodils',
    // 'The first song is the one that comes last in the alphabet');

    // assert.dom('[data-test-rr=song-list-item]:last-child').
    //   hasText('Elephants',
    //   'The last song is the one that comes first in the alphabet');

    assert.dom('[data-test-rr=song-list-item]:last-child').
    hasText('Spinning In Daffodils',
    'The last song is the one that comes last in the alphabet');
      });



  //Test4 : Enter text
  test('Search songs', async function (assert) {
    let band = this.server.create('band', {
      name:
        'Them Crooked Vultures'
    });
    this.server.create('song', {
      title: 'Elephants', rating: 5, band
    });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', {
      title: 'Mind Eraser, No Chaser',
      rating: 4, band
    });
    this.server.create('song', {
      title: 'Spinning in Daffodils',
      rating: 5, band
    });
    this.server.create('song', {
      title:
        'No One Loves Me & Neither Do I', rating: 5, band
    });
    await visit('/');
    await click('[data-test-rr=band-link]');
    await fillIn('[data-test-rr=search-box]', 'no');

    assert.equal(currentURL(), '/bands/1/songs?s=no');

    assert.dom('[data-test-rr=song-list-item]').exists({ count: 2 },
      'The songs matching the search term are displayed');
    await click('[data-test-rr=sort-by-title-desc]');

    assert.ok(currentURL().includes('s=no'));
    assert.ok(currentURL().includes('sort=titleDesc'));

    assert.dom('[data-test-rr=song-list-item]:first-child').
      hasText('No One Loves Me & Neither Do I',
        'A matching song that comes later in the alphabet appears on top');
    assert.dom('[data-test-rr=song-list-item]:last-child').
      hasText('Mind Eraser, No Chaser',
        'A matching song that comes sooner in the alphabet appears at the bottom');
  });
});
