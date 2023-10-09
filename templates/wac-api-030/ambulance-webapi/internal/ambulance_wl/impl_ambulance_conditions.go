package ambulance_wl

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetConditions - Provides the list of conditions associated with ambulance
func (this *implAmbulanceConditionsAPI) GetConditions(ctx *gin.Context) {
	ctx.AbortWithStatus(http.StatusNotImplemented)
}
