var get = Ember.get;

// Extend Ember.Route to add support for sensible
// document.title integration.
Ember.Route.reopen({

    titleToken: null,

    title: null,

    // Provided by Ember
    _actions: {
        collectTitleTokens: function (tokens) {

            var title = get(this, 'title');
            if (title) {
                // Stubbable fn that sets document.title
                this.router.setTitle(title);
            } else {
                // Continue bubbling.
                return true;
            }
        },
        collectDescriptionTokens: function (description) {
            var description = get(this, 'description');
            if (description) {
                // Stubbable fn that sets document.title
                this.router.setDescription(description);
            } else {
                // Continue bubbling.
                return true;
            }
        },
        collectKeywordTokens: function (keyword) {
            var keyword = get(this, 'keyword');
            if (keyword) {
                // Stubbable fn that sets document.title
                this.router.setKeyword(keyword);
            } else {
                // Continue bubbling.
                return true;
            }
        }

    }
});

Ember.Router.reopen({
    updateSeo: function () {
        this.send('collectTitleTokens', []);
        this.send('collectDescriptionTokens', []);
        this.send('collectKeywordTokens', []);
    }.on('didTransition'),
    setTitle: function (title) {
        if (Ember.testing) {
            this._title = title;
        } else {
            window.document.title = title;
        }
    },
    setDescription: function (description) {
        if (Ember.testing) {
            this.description = description;
        } else {
            Ember.$('meta[name="description"]').attr('content', description);
        }
    },
    setKeyword: function (keyword) {
        if (Ember.testing) {
            this.keyword = keyword;
        } else {
            Ember.$('meta[name="keyword"]').attr('content', keyword);
        }
    }

});
