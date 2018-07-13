var path = require('path');
var express = require('express');
var router = express.Router();
var zip = require('express-zip');
var fs = require('fs');
var http = require('http');
var formidable = require('formidable');
var jsonParser = require('./../../ApplicationTier/Components/jsonparser.js');
var presentationController = require("./../Controller/presentationcontroller.js");
var applicationController = require("./../../ApplicationTier/applicationcontroller.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(presentationController.getIndex());
});

/* POST dei file zippati. */
router.post('/code', function(req, res, next) {
        let appController = new applicationController();
            appController.parsing(req.body);
            let file = appController.getCode();

            res.zip(file, "ProjectIronWorks.zip");
            /*for(i in file)
                fs.unlinkSync(file[i].path);*/
})

module.exports = router;