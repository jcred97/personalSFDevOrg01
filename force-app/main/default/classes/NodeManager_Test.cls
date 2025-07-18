@isTest
public class NodeManager_Test {

    @isTest
    static void testConnectivity(){
        // Initialize CodingChallenge instance
        NodeManager program = new NodeManager();
        
        // Connect nodes in the network
		program.connect(1, 2);
        program.connect(20, 3);
        program.connect(1, 8);
        program.connect(9, 8);
        program.connect(10, 8);
        
        program.connect(2, 6);
        program.connect(6, 9);
        program.connect(10, 12);
        
        // Test connectivity between nodes

        // Test case 1: Node 2 is connected to Node 8
        Boolean isConnected = program.isConnected(2, 8);
        System.debug('Is Connected: ' + isConnected);
        System.assertEquals(true, isConnected, 'Node 2 should be connected to Node 8');
        
        // Test case 2: Node 10 is connected to Node 9
        isConnected = program.isConnected(10, 9);
        System.debug('Is Connected: ' + isConnected);
        System.assertEquals(true, isConnected, 'Node 10 should be connected to Node 9');
        
        // Test case 3: Node 1 is connected to Node 12
        isConnected = program.isConnected(1, 12);
        System.debug('Is Connected: ' + isConnected);
        System.assertEquals(true, isConnected, 'Node 1 should be connected to Node 12');
        
        // Test case 4: Node 3 is not connected to Node 12
        isConnected = program.isConnected(3, 12);
        System.debug('Is Connected: ' + isConnected);
        System.assertEquals(false, isConnected, 'Node 3 should not be connected to Node 12');      
    }
}