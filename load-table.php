<?php
	$file = $fopen("contacts.json","r") or die("The file cannot be found");
	$fileString = $fread($file,filesize("contacts.json"));
	fclose($file);
	echo $fileString;
?>