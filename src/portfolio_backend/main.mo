// Main.mo
import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor Portfolio {
    // Types
    type Project = {
        id: Text;
        title: Text;
        description: Text;
        technologies: [Text];
        imageUrl: Text;
    };

    // State
    private stable var nextId: Nat = 0;
    private var projects = HashMap.HashMap<Text, Project>(0, Text.equal, Text.hash);

    // Add a new project
    public func addProject(title: Text, description: Text, technologies: [Text], imageUrl: Text) : async Text {
        let id = Nat.toText(nextId);
        let project: Project = {
            id;
            title;
            description;
            technologies;
            imageUrl;
        };
        
        projects.put(id, project);
        nextId += 1;
        return id;
    };

    // Get all projects
    public query func getAllProjects() : async [Project] {
        var allProjects: [Project] = [];
        for ((id, project) in projects.entries()) {
            allProjects := Array.append(allProjects, [project]);
        };
        allProjects
    };

    // Get project by ID
    public query func getProject(id: Text) : async ?Project {
        projects.get(id)
    };

    // Update project
    public func updateProject(id: Text, title: Text, description: Text, technologies: [Text], imageUrl: Text) : async Bool {
        switch (projects.get(id)) {
            case (null) { false };
            case (?existing) {
                let updated: Project = {
                    id;
                    title;
                    description;
                    technologies;
                    imageUrl;
                };
                projects.put(id, updated);
                true
            };
        }
    };

    // Delete project
    public func deleteProject(id: Text) : async Bool {
        switch (projects.get(id)) {
            case (null) { false };
            case (?existing) {
                projects.delete(id);
                true
            };
        }
    };
}