// AbstractBlock.js
class AbstractBlock {
    setEditBlock(name_block, value) {
        try {
            let block = document.querySelector(name_block);
            block.innerHTML = value;
        } catch(error) {
            console.log(error);
            console.log(error.message);
        }
    }
}

export default AbstractBlock;
