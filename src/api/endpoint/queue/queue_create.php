<?php

/*
*  !!BUILD_VERIFY_NOCONFIG!!
*/

/*
*  ====>
*
*  *Create a slide queue.*
*
*  GET parameters
*    * name = Queue name.
*
*  Return value
*    * error  = An error code or API_E_OK on success.
*
*  <====
*/

require_once($_SERVER['DOCUMENT_ROOT'].'/api/api.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/common/php/slide.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/common/php/queue.php');

$QUEUE_CREATE = new APIEndpoint(array(
	APIEndpoint::METHOD		=> API_METHOD['POST'],
	APIEndpoint::RESPONSE_TYPE	=> API_RESPONSE['JSON'],
	APIEndpoint::FORMAT => array(
		'name' => API_P_STR
	),
	APIEndpoint::REQ_QUOTA		=> TRUE,
	APIEndpoint::REQ_AUTH		=> TRUE
));
api_endpoint_init($QUEUE_CREATE);

$tmp = preg_match('/[^a-zA-Z0-9_-]/', $QUEUE_CREATE->get('name'));
if ($tmp) {
	throw new ArgException(
		"Invalid chars in queue name."
	);
} else if ($tmp === NULL) {
	throw new IntException(
		"Regex match failed."
	);
}

$queue = new Queue($QUEUE_CREATE->get('name'));
$queue->set_owner($QUEUE_CREATE->get_caller()->get_name());
$queue->write();

$QUEUE_CREATE->send();
