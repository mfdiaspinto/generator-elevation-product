var Generator = require('yeoman-generator');

module.exports = class extends Generator {

	 // The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		// Next, add your custom code
	/*	this.helperMethod = function () {
			console.log('won\'t be called automatically');
		};
		 this.argument('appname', { type: String, required: true });

		// And you can then access it later; e.g.
		this.log(this.options.appname);
  */
 	}
	
	writing() {
    this.fs.copyTpl(
      this.templatePath(''),
      this.destinationPath(this.answers.product + ''),
			{ product: this.answers.product } // user answer `title` used
    );
	}
	
  paths() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
		// returns '~/projects/index.js'
		
		this.sourceRoot();
    // returns './templates'

    this.templatePath('index.js');
    // returns './templates/index.js'
  }	

	async prompting() {
    this.answers = await this.prompt([{
      type    : 'input',
      name    : 'product',
      message : 'Product name:',
    },{
      type    : 'input',
      name    : 'author',
      message : 'Author name:',
    },{
      type    : 'input',
      name    : 'email',
      message : 'Email:',
    },{
      type    : 'input',
      name    : 'version',
      message : 'Elevation version:',
    }]);
  }
  
  end() {
    this.log("Module Elevation 4 criado!!!");
  }
};