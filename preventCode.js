//using handsontable version is 7.2.1 
//open a div with 'hot' id in html body tag

var hotElement = document.querySelector('#hot'), hot, hotSettings;
hotSettings={data:{},columns:[]}; //fill properties
                
                hot = new Handsontable(hotElement, hotSettings);

              hot.addHook('beforeKeyDown', function (event) {
                    var editor = this.getActiveEditor();
                    var selected = this.getSelected();
                    var isEditMode;
                    if (editor === undefined) {
                        isEditMode = false;
                    }
                    else {
                        isEditMode = this.getActiveEditor()._opened;
                    }

                    if (isEditMode) return;

                    var endRowNum = selected ? (selected[0][2]) : null,
                        endColNum = selected ? (selected[0][3]) : null,
                        
                        rowsNum = this.countRows(),
                        colsNum = this.countCols(),
                        
                        isFirstCol = endColNum == 0,
                        isLastCol = endColNum == (colsNum - 1);

                    if (!isEditMode) {
                        if ((isFirstCol && event.key == "ArrowLeft") || (isLastCol && event.key == "ArrowRight")) {
                            Handsontable.Dom.stopImmediatePropagation(event);
                        }
                    }
                });
