/**
 * @fileoverview The file define and instantiates the various NooblyJS applications.
 *
 * @author NooblyJS Core Team
 * @version 1.0.1
 * @since 2025-08-24
 */

'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { EventEmitter } = require('events');

// Iniitiate the Web and Api Interface
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// initiate the event mechanism
const eventEmitter = new EventEmitter()

// Initiate the service Registry
const serviceRegistry = require('nooblyjs-core');
serviceRegistry.initialize(app,eventEmitter);

const log = serviceRegistry.logger('console');
const cache = serviceRegistry.cache('memory');
const dataserve = serviceRegistry.dataService('memory');
const filing = serviceRegistry.filing('local');
const queue = serviceRegistry.queue('memory');
const scheduling = serviceRegistry.scheduling('memory');
const searching = serviceRegistry.searching('memory');
const measuring = serviceRegistry.measuring('memory');
const notifying = serviceRegistry.notifying('memory');
const worker = serviceRegistry.working('memory');
const workflow = serviceRegistry.workflow('memory');

// instantiate an auth service
const authservice = serviceRegistry.authservice('memory');

// Initiate the content Registry
const wiki = require('nooblyjs-app-wiki');
wiki(app, server, eventEmitter, serviceRegistry,{});

// Initiate the content Registry
//const blog = require('nooblyjs-apps-blog');
//blog(app,eventEmitter,serviceRegistry)

// Launch the application manager
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3003, () => {
  log.info(`Nooblyjs Content Server running on port ${process.env.PORT || 3003}`);
});