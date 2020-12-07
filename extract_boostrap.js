var css = require('css');
var fs = require('fs')
var postcss = require('postcss');
var cssDeclarationSorter = require('css-declaration-sorter');
const prompt = require('prompt');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));
modules=obj.modules
modules.forEach(module => {
	main(module)
})

function main(module){
	var contain_strings=module.value.split(";");
	var all_selectors=[]
	var module_name=module.key;
	var data = fs.readFileSync('bootstrap.css', {encoding:'utf8',}); 
	console.log("doing:"+module_name);
		var cssString=data.toString();
		var css_json = css.parse(cssString);
		rules=css_json.stylesheet.rules
		new_rules=[];
		old_rules=[];
		rules.forEach(rule => { 
			
			selectors=rule.selectors
			if (selectors){
				if (selectors.length>1){
					temp_new_selectors=[]
					temp_old_selectors=[]
					selectors.forEach(selector => {
						console.log(selector)
						all_selectors.push(selector)
					})
					
				}
				else{
					//rule.file_length = rule.position.end.line - rule.position.start.line
					console.log(rule.selectors[0])
					all_selectors.push(rule.selectors[0])
				}
			 
			}
			else{
				//rule.file_length = rule.position.end.line - rule.position.start.line
				thistype=rule.type
				if (thistype=="media"){
					media_rules=rule.rules
					new_media_rules=[]
					old_media_rules=[]
					media_rules.forEach(media_rule => { 
						selectors=media_rule.selectors
						if (selectors){
							if (selectors.length>1){
								temp_new_selectors=[]
								temp_old_selectors=[]
								
								selectors.forEach(selector => {
									console.log(selector)
									all_selectors.push(selector)
								})
							
										
							}
							else{
								all_selectors.push(media_rule.selectors[0])
							}
						 
						}
					})
					
					if (old_media_rules.length>0){
						
						edited_rule=JSON.parse(JSON.stringify(rule));
						edited_rule.rules=old_media_rules;
						old_rules=old_rules.concat([edited_rule]);
					}
					
					if (new_media_rules.length>0){
						
						edited_rule=JSON.parse(JSON.stringify(rule));
						edited_rule.rules=new_media_rules;

						new_rules=new_rules.concat([edited_rule]);
					}
				}
				
				else{
					old_rules=old_rules.concat([rule]);
				}
		};
		})
		css_json.stylesheet.rules = old_rules;
		var old_css=css.stringify(css_json);
		css_json.stylesheet.rules = new_rules;
		var new_css=css.stringify(css_json);
		fs.writeFileSync("output.json", all_selectors.join(";"));

}

//

// To CSS

// Appending to DOM (HTMLHeadElement)
// alias (global): createCSS(css);
// CSSJSON.toHEAD(json);
