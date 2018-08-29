$(function () {

    $.getJSON(API_URL, function (data) {
        addAllMaps(data);
    });

    function addAllMaps(data) {
        if (data.maps.length === 0) {
            $('<div class="col-12 text-center">No result :-(</div>').appendTo('.maps');
        }
        for (let map of data.maps) {
            if (map.images.length === 0) {
                map.images.push({"url": "/static/mapsapp/images/empty.png"});
            }
            let alert = '';
            if (map.newer_version !== null) {
                alert = '<div class="alert alert-info" role="alert">\
                      A newer version of this map is available! \
                    <a href="' + map.newer_version + '" class="alert-link">Check it out!</a>\
                    </div>'
            }
            $('<div class="col-lg-4 col-md-6 col-12"> \
                <div class="card"> \
                    <img class="card-img-top mapscreenshot rounded" src="' + map.images[0].url + '" />\
                        <div class="card-body">\
                            ' + alert + '\
                            <h5 class="card-title"><a href="' + map.pageurl + '">' + map.name + '</a><small class="text-muted"> ' + map.version + '</small></h5>\
                            <h6 class="card-subtitle mb-2 text-muted">by ' + map.authors + '</h6>\
                            <p class="card-text">' + map.description + '</p>\
                            <p>\
                                <a href="' + map.fileurl + '" class="card-link btn btn-secondary">Download map</a>\
                                <a href="' + map.url + '" class="card-link btn btn-outline-secondary" target="_blank">Website</a>\
                            </p>\
                            <div class="tags">Tags: \
                            ' + getTags(map.tags) + '\
                            </div>\
                            <div class="tags">Versions: \
                            ' + getVersiontags(map.versiontags) + '\
                            </div>\
                        </div>\
                    </div>\
            </div>').appendTo('.maps');
        }
    }

    function getTags(tags) {
        let retval = "";
        for (tag of tags) {
            retval += '<a href="/tags/' + tag.id + '" class="badge badge-secondary">' + tag.name + '</a> ';
        }
        return retval;
    }

    function getVersiontags(tags) {
        let retval = "";
        for (tag of tags) {
            retval += '<a href="/version/' + tag + '" class="badge badge-secondary">' + tag + '</a> ';
        }
        return retval;
    }

});