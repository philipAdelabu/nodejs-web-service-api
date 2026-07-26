import Contact from '../models/contact.js';
import User from  '../models/user.js';
import UserService from './user.service.js';
import { readFile } from "fs/promises";



class ContactService {
     constructor(){

     }

    
     static async createContact(userId, data = {}){
         if(!data) throw new Error('Bad request body');
           try{
            let user;
               user = await UserService.getUserById(userId);
            if(!user) 
                user = await UserService.createUser({username: data.email});
            data.userId = user._id;
            const result = await Contact.create(data);
            return result;
           }catch(error){
            throw error;
           }
    
       }
    
    
    static async getContact(contactId){
          try{
            const result = await Contact.findOne({_id: contactId});
            return result;
           }catch(error){
            throw error;
           } 
    }

     static async getContacts(){
          try{
            const result = await Contact.find();
            return result;
           }catch(error){
            throw error;
           }   
    }

    static async updateContact(contactId, data){
        try{
            const result = await Contact.findOneAndUpdate({_id: contactId}, data, {new: true});
            return result;
           }catch(error){
            throw error; 
           } 
    }

    static async deleteContact(contactId){
        try{
            const result = await Contact.findOneAndDelete({_id: contactId});
            if(!result){
                throw new Error("Contact not found");
            }
            return result;
           }catch(error){
            throw error;
           } 
    }       
    
}

export default ContactService;