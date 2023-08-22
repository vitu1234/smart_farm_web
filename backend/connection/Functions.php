<?php

Class Functions{
    
    private $con;
    public $records;
    public $numlinks;
    public $item_per_page =10;
    
    public $africas_username = 'sandbox'; // use 'sandbox' for development in the test environment
    public $africas_talk_apiKey   = 'ce613c96a34de96be089ab54486b543c9fdc4a82f682b40451bff514a8595277'; // use your sandbox app 
    
    function __construct(){
        
        require_once dirname(__FILE__).'/connection.php';
        
        
        $database = new Connection();
        
        $this->con = $database->openConnection();
        
        // Require https
        // if ($_SERVER['HTTPS'] != "on") {
        //     $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
        //     header("Location: $url");
        //     exit;
        // }
    }
        
    
       //count total records
    function countAll($query){
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        return $stmt->rowCount();
    }

	 
    
    //RETRIEVE SINGLE RECORD
    function retrieveSingle($query){
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt->fetch();
            
    }
    
    //RETRIEVE SINGLE RECORD
    function retrieveMany($query){
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
            
    }
	
     /* function to UPDATE sql data*/
    function updateData($table, $data, $where){
        $cols = array();

        foreach($data as $key=>$val) {
            $cols[] = "$key = '$val'";
        }
        $sql = "UPDATE $table SET " . implode(', ', $cols) . " WHERE $where";
        
        
        $stmt = $this->con->prepare($sql);
        if($stmt->execute()){
            return 1;
        }else{
            return 2;
        }

        
    }
    
     /* function to insert into table */
    function insertData($table, $data) {
        $key = array_keys($data);
        $val = array_values($data);
        $sql = "INSERT INTO $table (" . implode(', ', $key) . ") "
             . "VALUES ('" . implode("', '", $val) . "')";

        $stmt = $this->con->prepare($sql);
        
        if($stmt->execute()){
            return 1;
        }else{
            return 2;
        }
    }
    
    function deleteData($table,$where){
        
        $sql = "DELETE FROM $table WHERE $where";
        
        
        $stmt = $this->con->prepare($sql);
        if($stmt->execute()){
            return 1;
        }else{
            return 2;
        }
    }
    
        function printTruncated($maxLength, $html, $isUtf8=true)
{
    $printedLength = 0;
    $position = 0;
    $tags = array();

    // For UTF-8, we need to count multibyte sequences as one character.
    $re = $isUtf8
        ? '{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;|[\x80-\xFF][\x80-\xBF]*}'
        : '{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;}';

    while ($printedLength < $maxLength && preg_match($re, $html, $match, PREG_OFFSET_CAPTURE, $position))
    {
        list($tag, $tagPosition) = $match[0];

        // Print text leading up to the tag.
        $str = substr($html, $position, $tagPosition - $position);
        if ($printedLength + strlen($str) > $maxLength)
        {
            print(substr($str, 0, $maxLength - $printedLength));
            $printedLength = $maxLength;
            break;
        }

        print($str);
        $printedLength += strlen($str);
        if ($printedLength >= $maxLength) break;

        if ($tag[0] == '&' || ord($tag) >= 0x80)
        {
            // Pass the entity or UTF-8 multibyte sequence through unchanged.
            print($tag);
            $printedLength++;
        }
        else
        {
            // Handle the tag.
            $tagName = $match[1][0];
            if ($tag[1] == '/')
            {
                // This is a closing tag.

                $openingTag = array_pop($tags);
                assert($openingTag == $tagName); // check that tags are properly nested.

                print($tag);
            }
            else if ($tag[strlen($tag) - 2] == '/')
            {
                // Self-closing tag.
                print($tag);
            }
            else
            {
                // Opening tag.
                print($tag);
                $tags[] = $tagName;
            }
        }

        // Continue after the tag.
        $position = $tagPosition + strlen($tag);
    }

    // Print any remaining text.
    if ($printedLength < $maxLength && $position < strlen($html))
        print(substr($html, $position, $maxLength - $printedLength));

    // Close any open tags.
    while (!empty($tags))
        printf('</%s>', array_pop($tags));
}

    

}

?>