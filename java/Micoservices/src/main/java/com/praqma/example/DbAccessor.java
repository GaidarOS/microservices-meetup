package com.praqma.example;

import com.arangodb.ArangoCollection;
import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDBException;
import com.arangodb.entity.BaseDocument;
import com.arangodb.entity.CollectionEntity;
import com.arangodb.util.MapBuilder;

import java.util.*;

class DbAccessor {

    private ArangoDB arangoDB;

    private String password = "pass";
    private String dbName = "PraqmaMicro";
    private String user= "root";
    private String host = "127.0.0.1";
    private int port = 8529;
    private String collectionName = "SearchedWords";
    private String KeyWord="word";
    private String KeyCount="count";
    private String KeyEncoded="encoded";

    DbAccessor(){
        arangoDB = new ArangoDB.Builder().password(password).user(user).host(host,port).build();

        try {
            arangoDB.createDatabase(dbName);
            System.out.println("Database created: " + dbName);
        } catch (ArangoDBException e) {
            System.err.println("Failed to create database: " + dbName + ": " + e.getMessage());
        }

        try {
            CollectionEntity myArangoCollection = arangoDB.db(dbName).createCollection(collectionName);
            System.out.println("Collection created: " + myArangoCollection.getName());
        } catch (ArangoDBException e) {
            System.err.println("Failed to create collection: " + collectionName + "; " + e.getMessage());
        }
    }

    String Insert(WordModel data){
        BaseDocument Document = new BaseDocument();
        Document.setKey(data.word);
        Document.addAttribute(KeyWord, data.word);
        Document.addAttribute(KeyCount, data.count);
        Document.addAttribute(KeyEncoded, data.encoded);
        try {
            arangoDB.db(dbName).collection(collectionName).insertDocument(Document);
            System.out.println("Document created id:"+Document.getId()+" name: "+Document.getKey());
            return "Document created id:"+Document.getId()+" name: "+Document.getKey();
        } catch (ArangoDBException e) {
            System.err.println("Failed to create document. " + e.getMessage());
            return "Failed to create document. \" + e.getMessage()";
        }
    }

    String Delete(WordModel data){

        try {
            if (arangoDB.db(dbName).collection(collectionName).documentExists(data.word)) {
                arangoDB.db(dbName).collection(collectionName).deleteDocument(data.word);
                return "deleted: " + data.word;
            }else {return "Key not found";}
        } catch (ArangoDBException e) {
            System.err.println("Failed to delete document. " + e.getMessage());
            return "Failed to delete: "+data.word;
        }

    }

    List<WordModel> List(){
        List<WordModel> models= new ArrayList<WordModel>();
        try {
            String query = "FOR document IN "+collectionName +" RETURN document";
            Map<String, Object> bindVars = new MapBuilder().get();
            ArangoCursor<BaseDocument> cursor = arangoDB.db(dbName).query(query, bindVars, null, BaseDocument.class);

            List<BaseDocument> list=cursor.asListRemaining();
            for (BaseDocument doc: list){
                models.add(Get(doc.getKey()));
            }
        } catch (ArangoDBException e) {
            System.err.println("Failed to execute query. " + e.getMessage());
        }
        return models;
    }

    WordModel Get(WordModel data){
        try {
            BaseDocument myDocument = arangoDB.db(dbName).collection(collectionName).getDocument(data.word,
                    BaseDocument.class);
            WordModel model=new WordModel();
            model.word=myDocument.getAttribute(KeyWord).toString();
            model.count=myDocument.getAttribute(KeyCount).toString();
            model.encoded=myDocument.getAttribute(KeyEncoded).toString();
            return model;
        } catch (ArangoDBException e) {
            System.err.println("Failed to get document: myKey; " + e.getMessage());
            return null;
        }

    }

    WordModel Get(String key){
        try {
            BaseDocument myDocument = arangoDB.db(dbName).collection(collectionName).getDocument(key,
                    BaseDocument.class);
            WordModel model=new WordModel();
            model.word=myDocument.getAttribute(KeyWord).toString();
            model.count=myDocument.getAttribute(KeyCount).toString();
            model.encoded=myDocument.getAttribute(KeyEncoded).toString();
            return model;
        } catch (ArangoDBException e) {
            System.err.println("Failed to get document: myKey; " + e.getMessage());
            return null;
        }

    }

    WordModel PopulateModel(String word, String count, String encoded){

        WordModel model=new WordModel();
        model.word=word;
        model.count=count;
        model.encoded=encoded;
        return model;
    }

}
