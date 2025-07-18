public class NodeManager {
    private Map<Integer, Set<Integer>> network; //Map to represent the network where each node is associated with a set of neighbors

    // Constructor to initialize the network with 100 nodes
    public NodeManager() {
        network = new Map<Integer, Set<Integer>>();
        populateNetwork();
    }
    
    // Method to populate the network with 100 nodes, each initially having an empty set of neighbors
    private void populateNetwork() {
        for (Integer i = 0; i < 100; i++) {
            network.put(i, new Set<Integer>());
        }
    }

    // Method to connect two nodes in the network
    public void connect(Integer nodeSource, Integer nodeDestination) {
        validateNodeIds(nodeSource, nodeDestination);
        
        network.get(nodeSource).add(nodeDestination); //Add the destination node as a set of neighbor of the source node
        network.get(nodeDestination).add(nodeSource); //Add the source node as a set of neighbor of the destination node
    }

    // Method to check if two nodes are connected in the network
    public Boolean isConnected(Integer nodeSource, Integer nodeDestination) {
        validateNodeIds(nodeSource, nodeDestination);
        
        Set<Integer> visited = new Set<Integer>(); //Initialize a set to keep track of the visited nodes during traversal
        return isConnectedHelper(nodeSource, nodeDestination, visited);
    }

    //Helper method for depth-first search traversal to check reachability between two nodes
    private Boolean isConnectedHelper(Integer nodeSource, Integer nodeDestination, Set<Integer> visited) {
        //If source node is directly connected to destination node, return true
        if (network.get(nodeSource).contains(nodeDestination)) {
            return true;
        }
        visited.add(nodeSource); //Add source node to the visited nodes
        
        //Iterate through the neighbors of the source node
        for (Integer neighbor : network.get(nodeSource)) {
            //If neighbor has not been visited, recursively check its neighbors
            if (!visited.contains(neighbor) && isConnectedHelper(neighbor, nodeDestination, visited)) {
                return true; //If path has been found from the neighbors of the source node, return true
            }
        }
        return false; //If no path found, return false
    }
    
    // Method to validate node IDs
    private void validateNodeIds(Integer nodeSource, Integer nodeDestination){
        if (!isValidNode(nodeSource) || !isValidNode(nodeDestination)) {
            throw new IllegalArgumentException('Invalid node ID. Node IDs must be integers between 0 and 99.');
        }    
    }
    
    // Method to validate if a node ID is within the range of 0 to 99
    private Boolean isValidNode(Integer nodeId) {
        return nodeId != null && nodeId >= 0 && nodeId < 100;
    }
}