const tutorials = require('../tutorials.json')

function getItems (query) {
  return query
    ? tutorials.filter(item => {
      return (item.packages.map(hash).indexOf(hash(query)) > -1) || (item['dcos_version'].indexOf(query) > -1)
    })
    : tutorials
}

function hash (name) {
  return name.replace(/\s+/g, '-').toLowerCase()
}

function getQuery () {
  const query = window.location.hash.split('#')
  const q = query[1]

  return q // string or undefined
}

function clean () {
  $(".demos-cards").empty()
}

function getTutorialItem(demo) {

  const contentClass = demo.featured ? 'px2 pt2' : 'pt2';
  const imageClass = demo.featured ? ' pr2' : '';
  let media = demo.image ? `<div class="${imageClass}"><img src="${ demo.image }" alt=""></div>` : ``;
  media = demo.youtube_id ? `<div class="${imageClass}"><div class="youtube"><iframe width="480" height="220" src="https://www.youtube.com/embed/${ demo.youtube_id }" frameborder="0" allowfullscreen></iframe></div></div>` : media;
  const classNames = demo.featured ? 'lg-col-12 col-12 flex flex-wrap mb3 bg-white' : 'bg-white'

  return `
    <div class="${classNames} xs-left px2 mb3 left-align has-footer tutorial">
      ${media}
      <div class="${contentClass}">
        <strong class="mt1 block">${demo.difficulty}</strong>
        <div class="tutorial-title">
          <h3 class="mt1 mb1 left">${demo.title}</h3>
          <div class="right tutorial-versions">${$.map(demo.dcos_version, (version, url) => `<a href="${url}">${version}</a>`).reverse().join(' ').toString()}</div>
        </div>
        <p class="block mt1">${demo.description}</p>
        <div class="specs flex flex-wrap">
          <div class="mb1"><a href="${demo.tutorial}" class="cta cta--button">Start Tutorial</a></div>
        </div>
      </div>
    </div>

    `;
}

function render (items) {

  const featured_items = items.filter(function(value) {
    return value.featured == true
  })

  const other_items = items.filter(function(value) {
    return value.featured == false
  })

  other_items.forEach(demo => {
    const item = getTutorialItem(demo);
    $(".tutorial-cards").append(item);
  });

  if (featured_items.length) {
    const featured_item = getTutorialItem(featured_items[0]);
    $(".tutorial-cards-featured").prepend(featured_item);
  }
}

function main () {
  const query = getQuery()
  const items = getItems(query)
  render(items)

  console.log(items);

  // if(query) {
  //   $(".demos-cards").prepend(
  //     `
  //     <div class="flex flex-wrap justify-start items-center col-12 mb2">
  //       <h3 class="px1 col-8 border-box">Showing demos matching: ${query}</h3>
  //       <span class="px1 col-4 right-align border-box">
  //         <a href="${document.location.href.replace(location.hash , '' )}">Reset filter</a>
  //       </span>
  //     </div>
  //     `
  //   )
  // }
}

/*****************
  This is used to listen to when people filter tags
*****************/
// window.onhashchange = function () {
//   const query = getQuery()

//   if (query) {
//     clean()
//     main()
//   }
// }

$(document).ready(main)
