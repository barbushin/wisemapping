/*
 *    Copyright [2011] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

mindplot.LocalActionDispatcher = new Class({
    Extends: mindplot.ActionDispatcher,
    initialize: function(designer) {
        $assert(designer, "designer can not be null");
        this._actionRunner = new mindplot.DesignerActionRunner(designer);
    },

    addIconToTopic: function(topicId, iconType) {
        var command = new mindplot.commands.AddIconToTopicCommand(topicId, iconType);
        this.execute(command);
    },

    addLinkToTopic: function(topicId, url) {
        var command = new mindplot.commands.AddLinkToTopicCommand(topicId, url);
        this.execute(command);
    },

    addTopic:function(model, parentTopicId, animated) {
        var command = new mindplot.commands.AddTopicCommand(model, parentTopicId, animated);
        this.execute(command);
    },

    addNoteToTopic: function(topicId, text) {
        var command = new mindplot.commands.AddNoteToTopicCommand(topicId, text);
        this.execute(command);
    },

    addRelationship: function(model, mindmap) {
        var command = new mindplot.commands.AddRelationshipCommand(model, mindmap);
        this.execute(command);
    },

    deleteTopics: function(topicsIds) {
        var command = new mindplot.commands.DeleteTopicCommand(topicsIds);
        this.execute(command);
    },

    dragTopic: function(topicId, position, order, parentTopic) {
        var command = new mindplot.commands.DragTopicCommand(topicId, position, order, parentTopic);
        this.execute(command);
    },

    moveControlPoint: function(ctrlPoint, point) {
        var command = new mindplot.commands.MoveControlPointCommand(ctrlPoint, point);
        this.execute(command);
    },

    removeIconFromTopic: function(topicId, iconModel) {
        var command = new mindplot.commands.RemoveIconFromTopicCommand(topicId, iconModel);
        this.execute(command);
    },
    removeLinkFromTopic: function(topicId) {
        var command = new mindplot.commands.RemoveLinkFromTopicCommand(topicId);
        this.execute(command);
    },

    removeNoteFromTopic: function(topicId) {
        var command = new mindplot.commands.RemoveNoteFromTopicCommand(topicId);
        this.execute(command);
    },
    changeFontStyleToTopic: function(topicsIds) {

        var commandFunc = function(topic) {
            var result = topic.getFontStyle();
            var style = (result == "italic") ? "normal" : "italic";
            topic.setFontStyle(style, true);
            return result;
        };
        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds);
        this._actionRunner.execute(command);

    },

    changeFontFamilyToTopic: function(topicIds, fontFamily) {
        $assert(topicIds, "topicIds can not be null");
        $assert(fontFamily, "fontFamily can not be null");


        var commandFunc = function(topic, fontFamily) {
            var result = topic.getFontFamily();
            topic.setFontFamily(fontFamily, true);

            core.Executor.instance.delay(topic.updateNode, 0, topic);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicIds, fontFamily);
        this.execute(command);
    },

    changeFontColorToTopic: function(topicsIds, color) {
        $assert(topicsIds, "topicIds can not be null");
        $assert(color, "color can not be null");

        var commandFunc = function(topic, color) {
            var result = topic.getFontColor();
            topic.setFontColor(color, true);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds, color);
        command.discartDuplicated = "fontColorCommandId";
        this.execute(command);
    },

    changeBackgroundColorToTopic: function(topicsIds, color) {
        $assert(topicsIds, "topicIds can not be null");
        $assert(color, "color can not be null");

        var commandFunc = function(topic, color) {
            var result = topic.getBackgroundColor();
            topic.setBackgroundColor(color);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds, color);
        command.discartDuplicated = "backColor";
        this.execute(command);
    },

    changeBorderColorToTopic : function(topicsIds, color) {
        $assert(topicsIds, "topicIds can not be null");
        $assert(color, "topicIds can not be null");

        var commandFunc = function(topic, color) {
            var result = topic.getBorderColor();
            topic.setBorderColor(color);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds, color);
        command.discartDuplicated = "borderColorCommandId";
        this.execute(command);
    },

    changeFontSizeToTopic : function(topicsIds, size) {
        $assert(topicsIds, "topicIds can not be null");
        $assert(size, "size can not be null");

        var commandFunc = function(topic, size) {
            var result = topic.getFontSize();
            topic.setFontSize(size, true);

            core.Executor.instance.delay(topic.updateNode, 0, topic);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds, size);
        this.execute(command);
    },

    changeShapeToTopic : function(topicsIds, shapeType) {
        $assert(topicsIds, "topicsIds can not be null");
        $assert(shapeType, "shapeType can not be null");

        var commandFunc = function(topic, shapeType) {
            var result = topic.getShapeType();
            topic.setShapeType(shapeType, true);
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds, shapeType);
        this.execute(command);
    },

    changeFontWeightToTopic : function(topicsIds) {
        $assert(topicsIds, "topicsIds can not be null");

        var commandFunc = function(topic) {
            var result = topic.getFontWeight();
            var weight = (result == "bold") ? "normal" : "bold";
            topic.setFontWeight(weight, true);

            core.Executor.instance.delay(topic.updateNode, 0, topic);
            /*var updated = function() {
             topic.updateNode();
             };
             updated.delay(0);*/
            return result;
        };

        var command = new mindplot.commands.GenericFunctionCommand(commandFunc, topicsIds);
        this.execute(command);
    },

    execute:function(command) {
        this._actionRunner.execute(command);
    }

});

