const express = require('express');
const jsonfile = require('jsonfile');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.get('/api/parent-transactions', (req, res) => {
    const parentData = jsonfile.readFileSync('Parent.json');
    const childData = jsonfile.readFileSync('Child.json');
  
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 2;
  
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const slicedParentData = parentData.data.slice(startIndex, endIndex);
  
    const parentTransactions = slicedParentData.map((parent) => {
      const filteredChildData = childData.data.filter((child) => child.parentId === parent.id);
      const totalPaidAmount = filteredChildData.reduce((acc, child) => acc + child.paidAmount, 0);
      return {
        id: parent.id,
        sender: parent.sender,
        receiver: parent.receiver,
        totalAmount: parent.totalAmount,
        totalPaidAmount: totalPaidAmount,
      };
    });
  
    const nextPage = pageNumber + 1;
  
    res.json({
      parentTransactions: parentTransactions,
      nextPage: nextPage,
    });
  });
  
  app.get('/api/child-data/:parentId', (req, res) => {
    
    const childData = jsonfile.readFileSync('Child.json');
    const parentData = jsonfile.readFileSync('Parent.json');
    const parentId = parseInt(req.params.parentId);
  
    const filteredChildData = childData.data.filter((child) => child.parentId === parentId);
  
    const childTransactions = filteredChildData.map((child) => {
      return {
        id: child.id,
        sender: parentData.data.find((parent) => parent.id === parentId).sender,
        receiver: parentData.data.find((parent) => parent.id === parentId).receiver,
        totalAmount: parentData.data.find((parent) => parent.id === parentId).totalAmount,
        paidAmount: child.paidAmount,
      };
    });
  
    res.json(childTransactions);
  });
  app.get('/api/parent-data', (req, res) => {
    const parentData = require('./Parent.json').data;
  
    res.json(parentData);
  });
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
