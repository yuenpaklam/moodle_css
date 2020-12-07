var css = require('css');
var fs = require('fs')
var postcss = require('postcss');
var cssDeclarationSorter = require('css-declaration-sorter');
const prompt = require('prompt');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));
modules=obj.modules
var all_modules_name=[];
modules.forEach(module => {
	main(module)
	all_modules_name.push("'"+module.key+"'")
	
})
fs.writeFileSync('files/modules.txt',all_modules_name.join(","));


function main(module){
	var contain_strings=module.value.split(";");
	
	var module_name=module.key;
	
	var exact=module.exact;
	var data = fs.readFileSync('files/remui.csso-min.css', {encoding:'utf8',}); 
	console.log("doing:"+module_name);
	console.log(contain_strings);
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
						index=-1
						
						contain_strings.forEach(contain_string => {
							if(exact){
								if (selector==contain_string){
									index=1;
								}
							}
							else{
								if (selector.indexOf(contain_string)>index){
									index=selector.indexOf(contain_string);
								}
							}
						})
						if (index>=0){
							temp_new_selectors.push(selector);
						}
						else{
							temp_old_selectors.push(selector);
						}
						
					})
					
					if (temp_old_selectors.length>0){
						
						edited_rule=JSON.parse(JSON.stringify(rule)); 
						edited_rule.selectors=temp_old_selectors;
						old_rules=old_rules.concat([edited_rule]);
					}
					if (temp_new_selectors.length>0){
						edited_rule=JSON.parse(JSON.stringify(rule)); 
						edited_rule.selectors=temp_new_selectors;
						new_rules=new_rules.concat([edited_rule]);
					}
				}
				else{
					//rule.file_length = rule.position.end.line - rule.position.start.line
					rule=JSON.parse(JSON.stringify(rule))
					index=-1
					contain_strings.forEach(contain_string => {
						if(exact){
							if (rule.selectors[0]==contain_string){
								index=1;
							}
						}
							else{
								if (rule.selectors[0].indexOf(contain_string)>index){
								index=rule.selectors[0].indexOf(contain_string);
							}
						}
						
					})
					if (index>=0){
						new_rules=new_rules.concat([rule]);
					}
					else{
						old_rules=old_rules.concat([rule]);
					}
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
									index=-1
									contain_strings.forEach(contain_string => {
										
										if(exact){
											if (selector==contain_string){
												index=1;
											}
										}
										else{
											if (selector.indexOf(contain_string)>index){
												index=selector.indexOf(contain_string);
											}
										}
									})
									if (index>=0){
										temp_new_selectors.push(selector)
									}
									else{
										temp_old_selectors.push(selector)
									}
								})
							if (temp_old_selectors.length>0){
								media_rule=JSON.parse(JSON.stringify(media_rule)); 
								media_rule.selectors=temp_old_selectors;
								old_media_rules=old_media_rules.concat([media_rule]);
							}
							if (temp_new_selectors.length>0){
								media_rule=JSON.parse(JSON.stringify(media_rule)); 
								media_rule.selectors=temp_new_selectors;
								new_media_rules=new_media_rules.concat([media_rule]);
							}
										
							}
							else{
								index=-1
								contain_strings.forEach(contain_string => {
								if(exact){
									if (media_rule.selectors[0]==contain_string){
										index=1;
									}
								}
									else{
										if (media_rule.selectors[0].indexOf(contain_string)>index){
										index=media_rule.selectors[0].indexOf(contain_string);
									}
								}
								
								})
								if (index>=0){
									new_media_rules=new_media_rules.concat([media_rule]);
								}
								else{
									old_media_rules=old_media_rules.concat([media_rule]);
								}
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
		fs.writeFileSync('files/remui.csso-min.css', old_css);
		css_json.stylesheet.rules = new_rules;
		var new_css=css.stringify(css_json);
		fs.writeFileSync('files/'+module_name+".css", new_css);

}

//

// To CSS

// Appending to DOM (HTMLHeadElement)
// alias (global): createCSS(css);
// CSSJSON.toHEAD(json);
