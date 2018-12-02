<?php
	$data = $_REQUEST["contacts"];
	$file = fopen("contacts.json","w") or die("This file was unable to be created");
	fwrite($file,$data);
	fclose($file);
?>