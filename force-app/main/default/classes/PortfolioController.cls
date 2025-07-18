// MyController.cls
public with sharing class PortfolioController {
    @AuraEnabled(cacheable=false)
    public static void sendDataAndEmail(String inputFirstName, String inputLastName, String inputEmail, String inputSubject, String inputMessage) {
        // Send data to a method that processes the data
        processInputData(inputMessage);

        // Send email to the recipient
        //test
        sendEmail(inputFirstName, inputLastName, inputEmail, inputSubject, inputMessage);
    }

    // Method to process input data
    private static void processInputData(String inputMessage) {
        // Your logic to process the input data goes here
        // For demonstration, just logging the data
        System.debug('Received data in Apex: ' + inputMessage);
    }

    // Method to send email
    @AuraEnabled(cacheable=false)
    public static void sendEmail(String inputFirstName, String inputLastName, String inputEmail, String inputSubject, String inputMessage) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[] { inputEmail });
        email.setSenderDisplayName(inputFirstName + ' ' + inputLastName);
        email.setSubject(inputSubject);
        email.setPlainTextBody(
                'Email: ' + inputEmail + '\n' +
                inputMessage
            );
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}
