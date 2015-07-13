# restful-routing-helper
This is a rather simple helper, to provide a basic restful routing when using express & mongoose
## Usage
```javascript
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var RestfulRoutingHelper = require('restful-routing-helper');

// require your mongoose model
var Item = require('./api/models/item');

// provide: router, Model, model-url, url-refix
new RestfulRoutingHelper(router, Item, 'items', '/api');
```

This will provide routing for the following actions:
```javascript
// Get all items
router.get('/api/items', function(...));

// Get an item
router.get('/api/items/:items_id', function(...));

// Add an item
router.post('/api/items', function(...));

// Update an item
router.put('/api/items/:items_id', function(...));

// Delete an item
router.delete('/api/items/:items_id', function(...));
```
