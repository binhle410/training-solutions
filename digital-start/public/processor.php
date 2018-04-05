<?php
require('pdf/fpdf.php');
define('DIR_UPLOAD', "./uploads/pdf/");

class PDF extends FPDF {
	function SetCellMargin($margin) {
		// Set cell margin
		$this->cMargin = $margin;
	}
}

$title = [
	'step-1' => 'PROFILE',
	'step-2' => 'WEB DESIGN',
	'step-3' => 'CONTENT',
	'step-4' => 'TECHNICAL AND SEO',
];
$files = [ 'homepage', 'propos', 'prestation', 'galerie', 'contact' ];
if($_POST) {
	$namefile = createDirFile();
	$pdf      = new PDF();
	$pdf->AliasNbPages();
	$pdf->AddPage();
	$pdf->SetFont('Times', '', 12);
	$index = 0;
	foreach($_POST['data'] as $name => $value) {
		if($index > 0) {
			$pdf->AddPage();
		}
		$pdf->Cell(0, 10, $title[ $name ], 0, 1, 'C');
		foreach($value as $k => $v) {
			if( ! is_array($v)) {
				if($v || $v === 0 || $v === '0') {
					if($name == 'step-2') {
						$url = $_SERVER['HTTP_ORIGIN'] . sprintf('%suploads/prods/%s.jpg', str_replace('processor.php', '', $_SERVER['REQUEST_URI']), ($k === 'home' ? 'home' . $v : 'templates/' . $v) . '');
						if($k === 'home') {
							$imgWidth  = 0;
							$imgHeight = 200;
						} else {
							$pdf->AddPage();
							$imgWidth  = 123;
							$imgHeight = 0;
						}
						$pdf->Cell(30, 10, ucfirst(str_replace('-', ' ', $k)) . ' :', 0, 1);
						$pdf->SetCellMargin(5);
						$pdf->Cell(30, 10, $pdf->Image($url, $x = null, $y = null, $w = $imgWidth, $h = $imgHeight, $type = '', $link = $url), 0, 1, 'L', '');
						$pdf->SetCellMargin(0);
					} else {
						$pdf->Cell(0, 10, ucfirst(str_replace('-', ' ', $k)) . ' : ' . $v, 0, 1, 'L');
					}
				}
			} else {
				if( ! in_array($k, [ 'homepage', 'propos', 'prestation', 'galerie', 'contact', 'graphiques' ])) {
					$pdf->Cell(0, 10, ucfirst(str_replace('-', ' ', $k)) . ':', 0, 1, 'L');
					foreach($v as $k1 => $v1) {
						$pdf->SetCellMargin(5);
						$pdf->Cell(0, 10, ucfirst(str_replace('-', ' ', $k1)) . ' : ' . $v1, 0, 1, 'L');
					}
					$pdf->SetCellMargin(0);
				}
			}
		}
		if($name == 'step-3') {
			if($_FILES) {
//				$url = $_SERVER['HTTP_ORIGIN'] . '/' . DIR_UPLOAD . $namefile . '/';
				$url = $_SERVER['HTTP_ORIGIN'] . sprintf('%suploads/pdf/%s/', str_replace('processor.php', '', $_SERVER['REQUEST_URI']), $namefile);
				
				foreach($_FILES['data']['name']['step-3'] as $nameOfile => $file) {
					$pdf->Cell(0, 10, ucfirst(str_replace('-', ' ', $nameOfile)) . ':', 0, 1, 'L');
					$pdf->SetCellMargin(5);
					if(isset($_FILES['data']['name']['step-3'][ $nameOfile ])) {
						if(is_array($file) && array_key_exists('images', $file)) {
							if(move_uploaded_file($_FILES['data']['tmp_name']['step-3'][ $nameOfile ]['images'], DIR_UPLOAD . $namefile . '/' . 'images-' . $nameOfile. '.' .  pathinfo($file['images'], PATHINFO_EXTENSION))) {
								$pdf->Cell(0, 10, 'Images' . '(click here)', '', 1, '', false, $url . 'images-' . $nameOfile. '.' .  pathinfo($file['images'], PATHINFO_EXTENSION));
							}
						}
						if(isset($file['texte'])) {
							if(move_uploaded_file($_FILES['data']['tmp_name']['step-3'][ $nameOfile ]['texte'], DIR_UPLOAD . $namefile . '/' . 'texte-' . $nameOfile . '.' .  pathinfo($file['texte'], PATHINFO_EXTENSION))) {
								$pdf->Cell(0, 10, 'Texte' . '(click here)', '', 1, '', false, $url . 'texte-' . $nameOfile. '.' .  pathinfo($file['texte'], PATHINFO_EXTENSION));
							}
						}
					}
					$pdf->SetCellMargin(0);
				}
			}
		}
		$index ++;
	}
	$pdf->Output('F', DIR_UPLOAD . $namefile . '.pdf');
	
	$to      = 'test@betaversion.xyz';
	$subject = 'Digital-Start Submission: ';
	$headers = 'From: no-reply@betaversion.xyz' . "\r\n" .
	           'X-Mailer: PHP/' . phpversion();
	
	$url     = $_SERVER['HTTP_ORIGIN'] . sprintf('%suploads/pdf/%s.pdf', str_replace('processor.php', '', $_SERVER['REQUEST_URI']), $namefile);
	$message = 'Vous avez une nouvelle demande ' . $url;
	
	if(isset($_POST['data']['step-3']['vos-coordonnees']['nom-entreprise'])) {
		$subject .= $_POST['data']['step-3']['vos-coordonnees']['nom-entreprise'];
	}
	
	mail($to, $subject, $message, $headers);
}
function createDirFile() {
	$date = new DateTime();
	$time = $date->getTimestamp();
	$name = (string) $time;
	mkdir(DIR_UPLOAD . $name);
	
	return $name;
}

?>