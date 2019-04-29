import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Media} from 'reactstrap';

class Onboard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
      return (
        <div class="personal-info-box" align="center">
            <Form onSubmit={this.onSubmit} id='form'>
                <FormGroup>
                    <Label for="position"><Media className="logo_s" src={require("./resources/logo_s.png")} alt="Slackers logo"></Media></Label>
                    <Input type="textarea" name="allergies" id="allergies" placeholder="List allergies here" class="personal-info-field" />
                    <label>
                      Select t-shirt size:     
                      <select value={this.state.value} onChange={this.handleChange}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                      </select>
                    </label>                </FormGroup>
                <Button className="submit" color="primary">Submit</Button>
            </Form>
        </div>      );
  }
}
export default Onboard;