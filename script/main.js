var fbSearch = fbSearch || {};

(function (fbSearch) {
    "use strict";

    fbSearch.Page = function () {

        /* Private Variable Declaration */
        var $accessToken = "422844521144379|tep2pW6z17sY4I4FGjJQW3h6Y3Q",
            $baseUrl = "https://graph.facebook.com/",
            $btnSearch = document.getElementById("btnSearch"),
            $txtSearch = document.getElementById("txtSearch"),
            $sortContainer = document.getElementById("sort-container"),
            $sortAsc = document.getElementById("sort-asc"),
            $sortDesc = document.getElementById("sort-desc"),
            $filterFav = document.getElementById("filter-fav"),
            $searchResultContainer = document.getElementById("search-result-container"),
            $placeholderImg = "http://placehold.it/50/55C1E7/fff",
            $showFav = false,
            $isSortAsc = false,
            $nolink = 'javascript:void(0)',

            $filteredList = [];

        var $searchResult = [];

        function init() {

            // Event Listener
            addEvent($btnSearch, 'click', search_click);
            addEvent($sortAsc, 'click', sortAsc);
            addEvent($sortDesc, 'click', sortDesc);
            addEvent($filterFav, 'click', filterFav);
        };


        // Functionality to Search Facebook Pages
        function searchPages(searchstring) {
            fbSearch.Loader.show();
            clearResult();
            fbSearch.ajaxRequest($baseUrl + "search?q=" + searchstring + "&type=page&access_token=" + $accessToken + "&fields=id,name,picture,about,description,category,link,likes", receivePageList);
        };

        // Action performed when FB returns the object with Page Details
        function receivePageList(data) {
            $sortContainer.style.display = 'block';
            $searchResult = data.data;
            $isSortAsc = true;
            renderSearchResult($searchResult.sortBy('name', false, false));
            fbSearch.Loader.hide();
        };

        // Generic function to add event to DOM element for both primitive and new browsers.
        function addEvent(element, evnt, funct) {
            if (element.attachEvent)
                return element.attachEvent('on' + evnt, funct);
            else
                return element.addEventListener(evnt, funct, false);
        }

        // Click event for Search button.
        function search_click(e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();

            var valid = validate($txtSearch.value);

            if (valid) searchPages($txtSearch.value);
        };

        // Small functionality to check if textbox is empty.
        function validate(text) {
            if (text === '') {
                alert("Please enter valid search quesry");
                return false;
            } else {
                return true;
            }
        }

        // Creating the search result HTML markup using vanilla JS.
        function renderSearchResult(data) {
            var $ul = document.getElementsByClassName("search-result")[0];
            var noOfItemsInRow = 4;

            if (data.length > 0) {
                var counter = 1;
                var $row = document.createElement('div');
                for (var i = 0; i < data.length; i++) {
                    var $hidden = document.createElement('input');
                    var $col = document.createElement('div'),
                        $panel = document.createElement('div');

                    $hidden.type = 'hidden';
                    $hidden.value = data[i].id;
                    $row.className = 'row';
                    $col.className = 'col-lg-' + noOfItemsInRow;
                    $panel.className = 'panel widget';

                    // Image / First Div
                    var $d1 = document.createElement('div'),
                        $d1Img = document.createElement('img'),
                        $d1div = document.createElement('div'),
                        $d1divImg = document.createElement('img');

                    $d1.className = 'half-float';
                    $d1Img.src = 'img/bg3.jpg';
                    $d1Img.className = 'img-responsive';

                    $d1div.className = 'half-float-bottom';
                    $d1divImg.src = data[i].picture.data.url || $placeholderImg;
                    $d1divImg.className = 'img-thumbnail img-circle thumb128';

                    $d1div.appendChild($d1divImg);
                    $d1.appendChild($d1Img);
                    $d1.appendChild($d1div);
                    $panel.appendChild($d1);

                    // Name and Category
                    var $d2 = document.createElement('div'),
                        $d2h3 = document.createElement('h3'),
                        $d2h3a = document.createElement('a'),
                        $d2p = document.createElement('p'),
                        $d2p2 = document.createElement('p');

                    $d2.className = 'panel-body text-center';
                    $d2h3.className = 'm0';
                    $d2h3a.href = data[i].link || $nolink;
                    $d2h3a.innerText = data[i].name;
                    $d2h3.appendChild($d2h3a);
                    $d2.appendChild($d2h3);

                    $d2p.className = 'text-muted';
                    $d2p.innerText = data[i].category || 'No Category Found';
                    $d2.appendChild($d2p);

                    $d2p2.innerHTML = data[i].description || 'No Description Found';
                    $d2.appendChild($d2p2);
                    $panel.appendChild($d2);

                    // Description and Like count.
                    var d3 = document.createElement('div'),
                        d3d1 = document.createElement('div'),
                        d3d1d1 = document.createElement('div'),
                        d3d1d2 = document.createElement('div'),
                        $span = document.createElement('span'),
                        d3d2 = document.createElement('div'),
                        d3d2h = document.createElement('h3'),
                        d3d2p = document.createElement('p');

                    d3.className = 'panel-body text-center bg-gray-dark';
                    d3d1.className = 'panel-widget-footer';
                    d3d1d1.className = 'col-xs-4 pull-left';
                    $span.className = data[i].isfav ? 'glyphicon glyphicon-heart-empty fav-icon fav' : 'glyphicon glyphicon-heart-empty fav-icon';
                    data[i].isfav = data[i].isfav || false; // Adding a dummy peoperty to play with the fav.

                    addEvent($span, 'click', toggleFav);
                    d3d2.className = 'col-xs-4 pull-right';
                    d3d2h.className = 'm0';
                    d3d2p.className = 'm0';
                    d3d2p.innerText = 'Likes';
                    d3d2h.innerText = data[i].likes;

                    d3d1d1.appendChild($span);
                    d3d1.appendChild(d3d1d1);
                    d3d2.appendChild(d3d2h);
                    d3d2.appendChild(d3d2p);

                    d3.appendChild(d3d1);
                    d3.appendChild(d3d2);

                    $panel.appendChild(d3);

                    $col.appendChild($hidden);
                    $col.appendChild($panel);

                    $row.appendChild($col);
                }
                $ul.appendChild($row);
            } else {

                // When no data - add empty div to display custom message
                var $liEmpty = document.createElement('li');
                $liEmpty.innerHTML = "<div class='alert alert-danger'>" +
                    "No data found matching your search query." +
                    "</div>";
                $liEmpty.className = "no-data";
                $ul.appendChild($liEmpty);
            }
        };

        // Clear the search result before appending data to search result.
        function clearResult() {
            document.getElementsByClassName("search-result")[0].innerHTML = "";
        };

        // Toggle the favourite tab.
        function toggleFav(e) {
            var id;

            if (e.target.classList.contains('fav')) {
                e.target.classList.remove('fav');
            } else {
                e.target.classList.add('fav');
            }

            if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes.length > 0) {
                id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input')[0].value;
            }

            for (var i = 0, len = $searchResult.length; i < len; i++) {
                if ($searchResult[i].id === id) {
                    $searchResult[i].isfav = !$searchResult[i].isfav;
                    if ($searchResult[i].isfav) {
                        $filteredList.push($searchResult[i]);
                    } else {
                        $filteredList.splice($searchResult[i], 1);
                    }
                }
            }
        };

        // Sort the data in Descending order by 
        // calling the method .sortBy(propertyname, isAscendingSort, isPropertyNameAInteger)
        function sortDesc(event) {
            event = event.preventDefault() || window.event;
            $isSortAsc = false;
            clearResult();
            renderSearchResult($showFav ? $filteredList.sortBy('name', true, false) : $searchResult.sortBy('name', true, false));
        };

        // Sort the data in Ascending order by 
        // calling the method .sortBy(propertyname, isAscendingSort, isPropertyNameAInteger)
        function sortAsc(event) {
            event = event.preventDefault() || window.event;
            $isSortAsc = true;
            clearResult();
            renderSearchResult($showFav ? $filteredList.sortBy('name', false, false) : $searchResult.sortBy('name', false, false));
        };

        // Filter the data based on Favourite selected from the search result.
        function filterFav(event) {
            event.preventDefault();
            clearResult();
            $showFav = !$showFav;
            //$showFav = $filteredList.length > 0 ? false : $showFav; // note : when there is no data in filtered list then reset the $showFav flag

            renderSearchResult($showFav ? $filteredList : $searchResult);

        };

        return {
            /* Public Properties*/
            init: init
        };
    };

    fbSearch.Page().init();

})(fbSearch);
