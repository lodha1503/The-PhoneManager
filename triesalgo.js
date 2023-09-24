// taking name to be in small letter
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){

        emptyArray = suggest(userData);
  
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

let ALPHABET_SIZE = 10;

// trie node
class TrieNode
{
	constructor()
	{
		this.children=new Array(ALPHABET_SIZE);
		this.isterminal=false;
        this.name="";
	}
}

function insert_number(root,phoneno,word)
{
	let intiialtemp = root;

		for (let i = 0; i < phoneno.length; i++) {
			let index = phoneno[i].charCodeAt(0) - '0'.charCodeAt(0);
			if (intiialtemp.children[index] == null){
                intiialtemp.children[index] = new TrieNode();
            }

				

			intiialtemp = intiialtemp.children[index];
		}

		// mark last node as leaf
		intiialtemp.isterminal = true;
        intiialtemp.name=word;
}

// Returns true if phoneno presents in trie, else
	// false
function search_number(root,phoneno)
{
	let intiialtemp = root;

		for (let i = 0; i < phoneno.length; i++) {
			let index = phoneno[i].charCodeAt(0) - '0'.charCodeAt(0);
			if (intiialtemp.children[index] == null)
                return "No number found with this name";

			intiialtemp = intiialtemp.children[index];
		}
        if(intiialtemp != null && intiialtemp.isterminal){
            return intiialtemp.name;
        }
        else{
            return "No number found with this name";
        }
		
}

// Returns true if root has no children, else false
function isEmpty(root)
{
	for (let i = 0; i < ALPHABET_SIZE; i++)
			if (root.children[i] != null)
				return false;
		return true;
}

// Recursive function to delete a phoneno from given Trie
function remove_number(root,phoneno,height)
{
	// If tree is empty
		if (root == null)
			return null;

		// If last character of phoneno is being processed
		if (height == phoneno.length) {

			// This node is no more end of word after
			// removal of given phoneno
			if (root.isterminal)
				root.isterminal = false;

			// If given is not prefix of any other word
			if (isEmpty(root)) {
				root = null;
			}

			return root;
		}

		// If not last character, recur for the child
		// obtained using ASCII value
		let index = phoneno[height].charCodeAt(0) - '0'.charCodeAt(0);
		root.children[index] =
			remove_number(root.children[index], phoneno, height + 1);

		// If root does not have any child (its only child got
		// deleted), and it is not end of another word.
		if (isEmpty(root) && root.isterminal == false){
		
            root = null;
		}
        

		return root;
}

function testResults (form) {


    const contact_info = document.getElementById("contact_input");
        let node=root;
        let node1=root;
        let details = contact_info.value;
        details = details.split(',');
        if(details.length!==2){
            alert("Incorrectly formatted input");
            return;
        }
        details[0] = details[0].trim();
        details[1] = details[1].trim();
        if(details[1].length!==10){
            alert("Incorrectly formatted input");
            return;
        }
        else{
            alert("correct input");
            insert_number(node,details[1],details[0]);
            alert("phone number insert_numbered of "+search_number(node1,details[1]));
            contact_info.value = "";
            return;
        }
  
    
    
 
}
function testResults1 (form1) {


    const delete_info = document.getElementById("delete_input");
  
    let details1 = delete_info.value.trim();
    if(details1.length!==10){
        alert("Incorrectly formatted input");
        return;
    }
    let node1=root;
    let node2=root;
    let node=root;
    alert(search_number(node1,details1));
    remove_number(node,details1,0);
    delete_info.value = "";
    return;
  
    
    
 
}


function findsubstr(temp, list, curr) {
    if(temp!=null){
        if (temp.isterminal ) {
            list.push(curr+"-"+temp.name);
          }
          if (!Object.keys(temp.children).length) {
            return;
          }
          for (let child in temp.children) {
            findsubstr(temp.children[child], list, curr + child);
          }
    }
    
   
  }
 
  function suggest(prefix) {
    // alert(prefix);
    let node = root;
    let curr = "";
    for (let i = 0; i < prefix.length; i++) {
        let index=prefix[i].charCodeAt(0)-'0'.charCodeAt(0);
   
      if (!node.children[index]) {
        return [];
      }
      node = node.children[index];
      curr += prefix[i];
    }
    let list = [];
    findsubstr(node, list, curr);
    return list;
  }
   let root = new TrieNode();

   


  
  



