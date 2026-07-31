import ContactService from '../services/contact.service.js'
import { sendSuccess, sendError } from '../utils/responseMessage.js';

class ContactController {
  constructor() {
    //
  }

    
    static async createContact(req, res, next){
        try{
           const data = req.body;
           const result = await ContactService.createContact(data);
           sendSuccess(res, result, 'New contact created successfully')
        }catch(error){
            sendError(res, error.message || 'Failed to create new contact', error.statusCode || 500);
            next(error);
        }
    }

      static async getContact(req, res, next){
        try{
        const contactId = req.params.contactId
           const result = await ContactService.getContact(contactId);
           sendSuccess(res, result, 'The operation was successful');
        }catch(error){
            sendError(res, error.message || 'Failed to retrieve a contact', error.statusCode || 500);
            next(error);
        }
    }

      static async getAllContacts(req, res, next){
      try{
           const result = await ContactService.getContacts();
           sendSuccess(res, result, 'The operation was successful');
        }catch(error){
            sendError(res, error.message || 'Failed to retrieve a contact', error.statusCode || 500);
            next(error);
        }
    }

    static async updateContact(req, res, next){
        try{
            const contactId = req.params.contactId;
            const data = req.body;
           const result = await ContactService.updateContact(contactId, data);
           sendSuccess(res, result, 'The data successfully updated');
        }catch(error){
            sendError(res, error.message || 'Failed to update a contact', error.statusCode || 500);
            next(error);
        }
    }

    static async deleteContact(req, res, next){
        try{
            const contactId = req.params.contactId;
           const result = await ContactService.deleteContact(contactId);
           sendSuccess(res, result, 'The contact deleted successfully');
        }catch(error){
            sendError(res, error.message || 'Failed to delete a contact', error.statusCode || 500);
            next(error);
        }
    }

}

export default ContactController;